
import { Sidenav } from "../../shared/components/Sidenav/Sidenav";
import { TitleBar } from "../../shared/components/TitleBar/TitleBar";
import "./App.scss";
import { Board } from "./Pages/Board/Board";

function App() {
  return (
    <div className="flex p-1 flex-col w-full h-full pt-0">
      <TitleBar />
      <div className="main-container">
        <Sidenav />
        <div className="overflow-y-auto max-h-full w-full">
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
