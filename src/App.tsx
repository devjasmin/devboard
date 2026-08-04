import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <h3 className="bg-black text-xl font-bold text-red-500 p-5">
        Herzlich Willkommen auf dem DevBoard
      </h3>
      <Outlet />
    </>
  );
}

export default App;
