use std::env::current_dir;
use deno_core::{resolve_path, serde_v8::{self}, v8::{self, Function, Global}, JsRuntime};
use serde::Deserialize;

pub async fn call<'a, T: Deserialize<'a>>(file: &str, runtime: &mut JsRuntime, args: Global<v8::Value>) -> T {
  let module_ns = init_and_get_namespace(file, runtime).await;
  
  let function = get_function_from_module(module_ns, runtime).await;
  let call = runtime.call_with_args(
    &function,
    &[args]
  );
  runtime.run_event_loop(Default::default()).await.unwrap();
  
  get_function_result::<T>(call.await.unwrap(), runtime)
}

async fn init_and_get_namespace (file: &str, runtime: &mut JsRuntime) -> Global<v8::Object>{
  let module = resolve_path(file, &current_dir().unwrap()).unwrap();
  let id = runtime.load_main_es_module(&module).await.unwrap();

  runtime.mod_evaluate(id).await.unwrap();
  
  runtime.get_module_namespace(id).unwrap()
}

async fn get_function_from_module<'a> (module_ns: Global<v8::Object>, runtime: &mut JsRuntime) -> Global<Function> {
  let scope = &mut runtime.handle_scope();

  let function_key = v8::String::new(scope, "apply");
  let function: v8::Local<Function> = module_ns.open(scope)
  .get(scope, function_key.unwrap().into())
  .unwrap().try_into().unwrap();
  
  v8::Global::new(scope, function)
}

fn get_function_result<'a, T: Deserialize<'a>> (result: Global<v8::Value>, runtime: &mut JsRuntime) -> T {
  let mut scope = runtime.handle_scope();
  let val = result.open(&mut scope);
  let obj = val.to_object(&mut scope).unwrap();
  
  serde_v8::from_v8::<T>(&mut scope, obj.into()).unwrap()
}