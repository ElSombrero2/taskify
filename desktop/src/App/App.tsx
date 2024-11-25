import "./App.scss";
import { TitleBar } from "./components/TitleBar/TitleBar";

function App() {
  return (
    <div className="flex p-1 flex-col w-full h-full pt-0">
      <TitleBar />
      <div className="w-full h-full  rounded-md border border-zinc-300 bg-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 dark:border-opacity-35">

      </div>
    </div>
  );
}

export default App;
