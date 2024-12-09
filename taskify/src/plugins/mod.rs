use deno_core::{serde_v8, v8::{self, Global}, JsRuntime};
use extensions::file::file;
use function::call;
use runtime::init_runtime;
use crate::board::Board;

pub mod tests;
pub mod runtime;
pub mod function;
pub mod extensions;

pub async fn load_script(file: &str, board: Board) -> Board  {
  let mut runtime = init_runtime(vec![
    file::init_ops_and_esm(),
  ]);
  let args = get_args(board, &mut runtime);
  call::<Board>(file, &mut runtime, args).await
}

fn get_args (board: Board, runtime: &mut JsRuntime) -> Global<v8::Value> {
  let mut scope = runtime.handle_scope();
  let req = serde_v8::to_v8(&mut scope, board).unwrap();
  Global::new(&mut scope, req)
}
