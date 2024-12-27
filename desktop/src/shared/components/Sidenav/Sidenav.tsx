import { Link } from "react-router"

export const Sidenav = () => {
  return (
    <div className="p-5 py-3 max-w-4 h-full border-r flex flex-col items-center justify-between">
      <div>
        <Link to="/">
          <i className="fa-solid fa-binoculars"></i>
        </Link>
      </div>
      <button>
        <i className="fa fa-cog"></i>
      </button>
    </div>
  )
}