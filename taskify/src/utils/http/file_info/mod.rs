use std::time::Duration;

use reqwest::header::HeaderMap;

fn extract_header<'a> (headers: &'a HeaderMap, key: &'a str) -> &'a str {
  if let Some(value) = headers.get(key) {
    return value.to_str().unwrap_or_default();
  }
  ""
}

pub fn get_file_info_from_url (url: &str) -> Option<(String, u32)> {
  if let Ok(res) = reqwest::blocking::Client::new().head(url).timeout(Duration::from_millis(500)).send() {
    let headers = res.headers();

    let content_type = extract_header(headers, "content-type");
    let size = extract_header(headers, "content-length")
    .to_string().parse::<u32>().unwrap_or(0);

    return Some((content_type.to_string(), size));
  }
  None
}
