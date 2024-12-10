import "ext:file/file.js";

globalThis.taskify = {
  ...globalThis,
  file: {
    readToString: Deno.core.ops.read_to_string,
  }
};