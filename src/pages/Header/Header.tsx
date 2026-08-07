import { Button } from "@/components/ui/button";
import { CircleUser, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-row place-content-between bg-black ">
      <Link to="/boards">
        <h3 className="text-xl font-bold text-cyan-300 p-5 flex items-center gap-2">
          <LayoutDashboard /> DevBoard Jasmin
        </h3>
      </Link>
      <Link to="/profile">
        <Button className="text-white mt-4 mr-4">
          <CircleUser /> Jasmin2
        </Button>
      </Link>
    </div>
  );
}

export default Header;
