FROM rust:latest

RUN apt update && apt upgrade -y 
RUN apt install -y g++-mingw-w64-x86-64 
 
RUN rustup target add x86_64-pc-windows-gnu 
RUN rustup toolchain install stable-x86_64-pc-windows-gnu

WORKDIR /opt/app
COPY . .

RUN cargo build --bin taskify --target x86_64-pc-windows-gnu --release

CMD ["mv", "target/x86_64-pc-windows-gnu/release/taskify.exe", "dist/windows/taskify.exe"]