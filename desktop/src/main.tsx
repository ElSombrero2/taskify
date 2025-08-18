import ReactDOM from "react-dom/client";
import { Theme, ThemeProvider } from "./providers/Theme/Theme";
import { useWindow } from "./hooks/window";
import App from "./modules/App/App";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./styles.scss";

const AppProvider = () => {
  const { os } = useWindow();

  return (
    <Theme.Consumer>
      {({theme}) => (
        <div className={`main-window ${theme} ${os}`}>
          <App />
        </div>
      )}
    </Theme.Consumer>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider>
    <AppProvider />
  </ThemeProvider>,
);
