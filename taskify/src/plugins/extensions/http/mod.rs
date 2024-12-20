use deno_core::{extension, op2};

extension!(
  http,
  ops = [get],
  esm_entry_point = "ext:http/http.js",
  esm = [ dir "src/plugins/extensions/http", "http.js" ]
);

#[op2(fast)]
pub fn get() {

}