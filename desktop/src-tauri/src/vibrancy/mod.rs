#![allow(unused_variables, unused)]
use tauri::Window;
use window_vibrancy::apply_acrylic;

pub fn apply_blur_to_window (window: &Window) {
  #[cfg(target_os = "macos")]
  window_vibrancy::apply_vibrancy(window, window_vibrancy::NSVisualEffectMaterial::HudWindow, None, None)
  .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

  #[cfg(target_os = "windows")]
  apply_acrylic(window, Some((0, 0, 0, 0)))
  .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
}