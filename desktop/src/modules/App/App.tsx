import { Sidenav } from "@/shared/components/Sidenav/Sidenav";
import { TitleBar } from "@/shared/components/TitleBar/TitleBar";
import { Board } from "./Pages/Board/Board";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Pages/Home/Home";
import { Tasks } from "./Pages/Board/Sections/Pages/Tasks/Tasks";
import { Lists } from "./Pages/Board/Sections/Pages/Lists/Lists";
import "./App.scss";

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
              <Route path="/board" element={<Board />}>
                <Route element={<Tasks />} path="main" />
                <Route element={<Lists />} path="list" />
                <Route element={<Lists />} path="docs" />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
