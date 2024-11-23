// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use widget::{close_widget, open_widget};

pub mod widget;

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        open_widget,
        close_widget,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
