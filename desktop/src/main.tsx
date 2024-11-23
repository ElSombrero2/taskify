import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App/App";
import { invoke } from "@tauri-apps/api";
import { Widget } from "./Widget/Widget";
import { appWindow } from "@tauri-apps/api/window";

const AppProvider = () => {
  const [isWidget, setIsWidget] = useState(false);

  useEffect(() => {
    setIsWidget(!!(window as any).widget);
    let listener = appWindow.onResized(async () => {
      if (await appWindow.isMinimized()) await invoke('open_widget');
      else invoke('close_widget');
    })

    return () => {
      listener.then(clean => clean())
    };
  })

  return (<>{isWidget ? <Widget /> : <App />}</>)
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>,
);
