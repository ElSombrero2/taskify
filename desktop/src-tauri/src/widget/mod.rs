use std::thread;

use tauri::{AppHandle, Manager, WindowBuilder};

fn create_instance(handle: AppHandle) {
  WindowBuilder::new(
    &handle,
    "widget",
    tauri::WindowUrl::App("index.html".into()),
  )
  .always_on_top(true)
  .skip_taskbar(true)
  .closable(false)
  .resizable(false)
  .transparent(true)
  .decorations(false)
  .inner_size(400.into(), 270.into())
  .initialization_script("window.widget=true")
  .build().unwrap();
}

#[tauri::command]
pub fn open_widget(handle: AppHandle) {
  thread::spawn(move || create_instance(handle));
}

#[tauri::command]
pub fn close_widget(handle: AppHandle) {
  if let Some(widget) = handle.get_window("widget") {
    widget.close().unwrap();
  }
}
