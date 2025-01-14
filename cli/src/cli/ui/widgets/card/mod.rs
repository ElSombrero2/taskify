use ratatui::{buffer::Buffer, layout::{Constraint, Direction, Layout, Rect}, style::Stylize, text::Line, widgets::{Block, Padding, Paragraph, Widget, Wrap}};

pub struct Card {
  
}


impl Widget for Card {
  fn render(self, area: Rect, buf: &mut Buffer) where Self: Sized {
    let block = Block::bordered().padding(Padding::uniform(1));
    let inner = block.inner(area);

    let horizontal = Layout::new(Direction::Horizontal, vec![
      Constraint::Length(35),
    ]).split(inner);

    // 2 for the borders and 2 for the margins
    let w = horizontal[0].width - 4;

    let title = Line::from("My Title").bold();
    let text = r"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum.";

    let mut count = 0;

    for line in text.lines() {
      let len = line.len() as u16;
      count += len;
    }

    // + 2 for the borders
    // + 2 for the margins
    // + 2 for the title and the blank space
    let h = (count / w) + 2 + 2 + 2;

    let description = Line::from(text);

    let paragraph = Paragraph::new(vec![
      title,
      Line::from(" "),
      description,
    ]).block(block).wrap(Wrap{ trim: true });

    let vertical = Layout::vertical(vec![
      Constraint::Length(h + 2),
    ]).split(horizontal[0]);


    paragraph.render(vertical[0], buf);
  }
}