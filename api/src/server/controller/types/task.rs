use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Serialize, Deserialize, Debug, ToSchema)]
pub struct RemoveTaskDTO {
  pub file: String,
  pub raw: String,
}

#[derive(Serialize, Deserialize, Debug, ToSchema)]
pub struct MoveTaskDTO {
  pub file: String,
  pub raw: String,
  pub from: String,
  pub to: String,
}