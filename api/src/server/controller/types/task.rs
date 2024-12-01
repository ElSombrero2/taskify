use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Serialize, Deserialize, Debug, ToSchema)]
pub struct RemoveTaskDTO {
  pub file: String,
  pub id: String,
}

#[derive(Serialize, Deserialize, Debug, ToSchema)]
pub struct MoveTaskDTO {
  pub file: String,
  pub id: String,
  pub from: String,
  pub to: String,
}