import { Button } from "@/components/ui/button";
import { CircleUser, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { ProfilContext } from "../context/ProfileContext";
import { useContext } from "react";

function Header() {
  const profilContext = useContext(ProfilContext);

  return (
    <div className="flex flex-row place-content-between bg-black ">
      <Link to="/boards">
        <h3 className="text-xl font-bold text-cyan-300 p-5 flex items-center gap-2">
          <LayoutDashboard /> DevBoard
        </h3>
      </Link>
      <Link to="/profile">
        <Button className="text-white mt-4 mr-4">
          <CircleUser /> {profilContext?.profilName}
        </Button>
      </Link>
    </div>
  );
}

export default Header;
