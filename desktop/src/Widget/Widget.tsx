
export const Widget = () => {
  return (
    <div data-tauri-drag-region className="main p-4 flex flex-col justify-between gap-4">
      <div className="flex justify-between items-start">
        <div className="title">
          <h1 className="text-lg font-medium">
            Project Name
          </h1>
          <h2 className="text-zinc-400 text-sm">Completion</h2>
        </div>

        <button>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold">Total Progress</p>
        <div className="w-full bg-zinc-300 dark:bg-zinc-200 h-[15px] rounded-full">

        </div>
      </div>

      <div className="gap-5 flex">
        <div className="w-1/3 h-24 bg-opacity-45 dark:bg-zinc-800 bg-zinc-200 rounded-lg flex flex-col justify-between items-center text-xs p-3">
          <div className="w-[30px] h-[30px] bg-white rounded-full">

          </div>
          <p className="font-bold">Todo</p>
          <p>
            16/10
          </p>
        </div>

        <div className="w-1/3 h-24 bg-opacity-45 dark:bg-zinc-800 bg-zinc-200 rounded-lg flex flex-col justify-between items-center text-xs p-3">
          <div className="w-[30px] h-[30px] bg-white rounded-full">

          </div>
          <p className="font-bold">In Progress</p>
          <p>
            16/10
          </p>
        </div>

        <div className="w-1/3 h-24 bg-opacity-45 dark:bg-zinc-800 bg-zinc-200 rounded-lg flex flex-col justify-between text-xs p-3">
          <p className="font-bold">Task ratio</p>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">
              6.8
            </p>

            <button className="text-2xl">{'>>'}</button>
          </div>
        </div>
      </div>
    </div>
  )
} 