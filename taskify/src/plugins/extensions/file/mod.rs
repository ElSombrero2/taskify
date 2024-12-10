use std::fs;

use deno_core::op2;

deno_core::extension!(
  file,
  ops = [ read_to_string ],
  esm_entry_point = "ext:file/file.js",
  esm = [ dir "src/plugins/extensions/file", "file.js" ],
);

#[op2]
#[string]
pub fn read_to_string(#[string] dir: String) -> Result<String, std::io::Error> {
  fs::read_to_string(dir)
}