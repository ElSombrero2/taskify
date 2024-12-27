
import { Sidenav } from "@/shared/components/Sidenav/Sidenav";
import { TitleBar } from "@/shared/components/TitleBar/TitleBar";
import "./App.scss";
import { Board } from "./Pages/Board/Board";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
       <div className="flex p-1 flex-col w-full h-full pt-0">
        <TitleBar />
        <div className="main-container">
          <Sidenav />
          <div className="overflow-y-auto max-h-full w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/board" element={<Board />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
