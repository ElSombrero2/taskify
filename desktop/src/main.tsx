import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./styles.scss";
import App from "./App/App";
import { Widget } from "./Widget/Widget";
import { useWindow } from "./hooks/window";
import { Theme, ThemeProvider } from "./Providers/Theme/Theme";

const AppProvider = () => {
  const { isWidget } = useWindow();

  return (
    <Theme.Consumer>
      {({theme}) => (
        <div className={`main-window ${theme}`}>
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
