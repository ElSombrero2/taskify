use crossterm::event::{self, Event};
use ratatui::{DefaultTerminal, Frame};

pub fn run_app () {
  let terminal = ratatui::init();
  let result = run(terminal);
  ratatui::restore();
  result
}

fn run(mut terminal: DefaultTerminal) {
  loop {
      terminal.draw(render).unwrap();
      if matches!(event::read().unwrap(), Event::Key(_)) {
          break;
      }
  }
}

fn render(frame: &mut Frame) {
frame.render_widget("hello world", frame.area());
}