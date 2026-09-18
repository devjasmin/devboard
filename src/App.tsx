import Header from "./pages/Header/Header";
import { Outlet } from "react-router-dom";
import "./App.css";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/database.types";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
);

function App() {
  fetchData();

  async function fetchData() {
    const { data, error } = await supabase.from("Test").select("*");
    if (error) {
      console.log(error);
    }
    console.log(data);
  }

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
