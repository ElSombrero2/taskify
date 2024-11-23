use std::thread;

use tauri::{AppHandle, Manager, WindowBuilder};

fn create_instance(handle: AppHandle) {
  WindowBuilder::new(
    &handle,
    "widget",
    tauri::WindowUrl::App("index.html".into()),
  )
  .always_on_top(true)
  .resizable(false)
  .minimizable(false)
  .skip_taskbar(true)
  .closable(false)
  .inner_size(350.into(), 200.into())
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
