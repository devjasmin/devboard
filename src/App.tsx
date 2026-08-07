import Header from "./pages/Header/Header";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6">
        <Outlet />
      </main>
    </>
  );
}

export default App;
