use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

mod string;
mod integer;

pub const STATES: &str = "TODO|READY|WIP|DONE|TESTING";

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, Clone, ToSchema)]
pub enum TaskState {
  TODO = 0,
  READY = 1,
  WIP = 2,
  TESTING = 3,
  DONE = 4,
}