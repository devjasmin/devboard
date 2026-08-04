import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <h3 className="bg-black text-5xl font-bold text-red-500 ml-20 mr-20 mt-10 p-10">
        Herzlich Willkommen auf dem DevBoard
      </h3>
      <Outlet />
    </>
  );
}

export default App;
