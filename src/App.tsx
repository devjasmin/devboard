import { Button } from "./components/ui/button";
import { Outlet } from "react-router-dom";
import { CircleUser, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-row place-content-between bg-black ">
        <Link to="/boards">
          <h3 className="text-xl font-bold text-red-500 p-5 flex items-center gap-2">
            <LayoutDashboard /> DevBoard Jasmin
          </h3>
        </Link>
        <Link to="/profile">
          <Button className="text-white mt-4">
            <CircleUser /> Jasmin2
          </Button>
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default App;
