use serde::Deserialize;
use utoipa::ToSchema;


#[derive(Deserialize, ToSchema)]
pub struct BoardQuery {
  pub path: Option<String>,
}