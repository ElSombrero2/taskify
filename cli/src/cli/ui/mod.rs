use clap::error::Result;
use comfy_table::Table;
use crossterm::event::{self, Event, KeyCode, KeyEventKind};
use ratatui::{layout::{Alignment, Constraint, Direction, Layout}, symbols::border, text::Line, widgets::{block::Position, Block, Padding, Tabs}, DefaultTerminal, Frame};
use widgets::card::Card;

// This code is just a draft
pub mod widgets;

pub fn run_app () {
  let terminal = ratatui::init();
  run(terminal).unwrap();
  ratatui::restore();
}

fn run(mut terminal: DefaultTerminal) -> Result<()> {
  let mut tab: usize = 0;
  loop {
    terminal.draw( |frame| render(frame, &tab))?;
    if let Event::Key(key_event) = event::read()?  {
      if key_event.kind == KeyEventKind::Press {
        if key_event.code == KeyCode::Esc {
          break Ok(());
        }
        else if key_event.code == KeyCode::Right {
          if tab >= 1 {
            tab = 0;
          } else {
            tab += 1;
          }
        }
        else if key_event.code == KeyCode::Left {
          if tab == 0 {
            tab = 1;
          } else {
            tab -= 1;
          }
        }
      }
    }
  }
}

fn render(frame: &mut Frame, selected_tab: &usize) {
  let window = Block::bordered().title("Taskify")
  .title_bottom("<Esc to quit>")
  .title_alignment(Alignment::Center);
  
  let title = Line::from("◄ ► to change tab")
  .right_aligned();

  let titles = vec!["Todo", "Ready"];

  let tabs = Tabs::new(titles)
  .select(*selected_tab)
  .block(window);

  let main = Block::bordered()
  .border_set(border::PROPORTIONAL_TALL)
  .title_alignment(Alignment::Right)
  .title_position(Position::Top)
  .padding(Padding::uniform(1));

  let inner_main = main.inner(frame.area());

  let layout = Layout::new(Direction::Vertical, vec![
    Constraint::Percentage(98),
    Constraint::Percentage(2),
  ])
  .split(inner_main);

  frame.render_widget(tabs, frame.area());
  frame.render_widget(main, layout[0]);
  frame.render_widget(title, layout[1]);
  frame.render_widget(Card{}, inner_main);
  frame.render_widget(Card{}, inner_main);
  frame.render_widget(Card{}, inner_main);
}