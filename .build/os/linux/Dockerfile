FROM rust:latest

WORKDIR /opt/app
COPY . .

RUN cargo build --bin taskify --release

CMD ["mv", "target/release/taskify", "dist/linux/taskify"]