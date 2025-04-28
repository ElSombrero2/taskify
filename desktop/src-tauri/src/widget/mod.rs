use std::thread;

use tauri::{AppHandle, Manager,WindowBuilder};

use crate::vibrancy::apply_blur_to_window;

fn create_instance(handle: AppHandle, theme: Option<String>, path: Option<String>) {
  if handle.get_window("widget").is_none() && path.is_some() {
    let script = format!("window.path=String.raw`{}`;window.widget=true;window.theme=`{}`", path.unwrap(), theme.unwrap_or("dark".to_string()));
    println!("{script}");
    let window = WindowBuilder::new(
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
    .inner_size(400.into(), 285.into())
    .initialization_script(&script)
    .build().unwrap();

    apply_blur_to_window(&window);
  }
}

#[tauri::command]
pub fn open_widget(handle: AppHandle, theme: Option<String>, path: Option<String>) {
  thread::spawn(move || create_instance(handle, theme, path));
}

#[tauri::command]
pub fn close_widget(handle: AppHandle) {
  if let Some(widget) = handle.get_window("widget") {
    widget.close().unwrap();
  }
}
