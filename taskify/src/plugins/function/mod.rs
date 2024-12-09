use std::env::current_dir;
use deno_core::{resolve_path, serde_v8, v8::{self, Function, Global}, JsRuntime};
use serde::Deserialize;

pub async fn call<'a, T: Deserialize<'a>>(file: &str, runtime: &mut JsRuntime, args: Global<v8::Value>) -> T {
  let function = get_function_from_module(file, runtime).await;
  let call = runtime.call_with_args(
    &function,
    &[args]
  );

  runtime.run_event_loop(Default::default()).await.unwrap();

  let res = call.await.unwrap();

  let mut scope = runtime.handle_scope();
  let val = res.open(&mut scope);
  let obj = val.to_object(&mut scope).unwrap();
  
  serde_v8::from_v8::<T>(&mut scope, obj.into()).unwrap()
}

async fn get_function_from_module<'a> (file: &str, runtime: &mut JsRuntime) -> Global<Function> {
  let module = resolve_path(file, &current_dir().unwrap()).unwrap();
  let id = runtime.load_main_es_module(&module).await.unwrap();
  let global = runtime.get_module_namespace(id).unwrap();
  let scope = &mut runtime.handle_scope();

  let function_key = v8::String::new(scope, "apply");
  let function: v8::Local<Function> = global.open(scope)
  .get(scope, function_key.unwrap().into())
  .unwrap().try_into().unwrap();
  
  v8::Global::new(scope, function)
}