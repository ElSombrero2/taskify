import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./styles.scss";
import App from "./App/App";
import { invoke } from "@tauri-apps/api";
import { Widget } from "./Widget/Widget";
import { appWindow } from "@tauri-apps/api/window";

const AppProvider = () => {
  const [isWidget, setIsWidget] = useState(false);
  const [isDark] = useState(true);

  useEffect(() => {
    const isWidget = !!(window as any).widget;
    setIsWidget(isWidget);
    let listener = appWindow.onResized(async () => {
      if (!isWidget) {
        if (await appWindow.isMinimized()) await invoke('open_widget');
        else invoke('close_widget');
      }
    })
    return () => {
      listener.then(clean => clean())
    };
  })

  return (
    <div className={`main-window ${isDark && 'dark'}`}>
      {isWidget ? <Widget /> : <App />}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>,
);
