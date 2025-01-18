import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./styles.scss";
import { Theme, ThemeProvider } from "./providers/Theme/Theme";
import { useWindow } from "./hooks/window";
import { Widget } from "./modules/Widget/Widget";
import App from "./modules/App/App";
import { invoke } from "@tauri-apps/api";

const AppProvider = () => {
  const { isWidget, os } = useWindow();
  invoke("zoom_window", {scaleFactor: 0.8});

  return (
    <Theme.Consumer>
      {({theme}) => (
        <div className={`main-window ${theme} ${os}`}>
          {isWidget ? <Widget /> : <App />}
        </div>
      )}
    </Theme.Consumer>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppProvider />
    </ThemeProvider>
  </React.StrictMode>,
);
