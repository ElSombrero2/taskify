use std::rc::Rc;
use deno_core::{Extension, FsModuleLoader, JsRuntime, RuntimeOptions};

pub fn init_runtime (extensions: Vec<Extension>) -> JsRuntime {
  let options = RuntimeOptions {
    module_loader: Some(Rc::new(FsModuleLoader)),
    extensions,
    ..Default::default()
  };
  JsRuntime::new(options)
}