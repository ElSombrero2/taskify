use comfy_table::{modifiers::UTF8_ROUND_CORNERS, presets::UTF8_FULL, ContentArrangement, Table};

pub fn create_table() -> Table {
  let mut table = Table::new();
  table
  .load_preset(UTF8_FULL)
    .apply_modifier(UTF8_ROUND_CORNERS)
    .set_content_arrangement(ContentArrangement::Dynamic);
  table
}

