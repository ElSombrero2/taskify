
pub fn get_file_info_from_url (url: &str) -> Option<(String, u32)> {
  if let Ok(res) = reqwest::blocking::Client::new().head(url).send() {
    let headers = res.headers();

    let content_type = if let Some(mime_type) = headers.get("content-type") { 
      mime_type.to_str().unwrap_or_default() 
    } else {
      "unknown"
    };

    let size = if let Some(mime_type) = headers.get("content-length") { 
      mime_type.to_str().unwrap_or_default().to_string().parse::<u32>().unwrap_or(0)
    } else {
      0
    };

    return Some((content_type.to_string(), size));
  }
  None
}