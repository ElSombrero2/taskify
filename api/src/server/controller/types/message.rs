use serde::{Deserialize, Serialize};
use utoipa::ToSchema;


#[derive(Serialize, Deserialize, ToSchema)]
pub struct MessageDTO {
  pub message: String,
  pub status: u16,
}