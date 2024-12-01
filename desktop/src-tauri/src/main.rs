// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use vibrancy::apply_blur_to_window;
use widget::{close_widget, open_widget};

mod widget;
mod vibrancy;

fn main() {
    tauri::Builder::default()
    .setup(|app|{
        let window = app.get_window("main").unwrap();
        apply_blur_to_window(window);
        Ok(())
    })
    .invoke_handler(tauri::generate_handler![
        open_widget,
        close_widget,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
