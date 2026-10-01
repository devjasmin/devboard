import type { Board, Task, Profilname } from "../types";
import { supabase } from "../lib/db";

export async function getBoards() {
  let { data: boards, error } = await supabase.from("boards").select("*");
  if (error) {
    console.error("Error fetching boards:", error);
  }
  console.log("getBoards Supabase:", boards);
  console.log("getBoards Supabase error:", error);
  return boards;
}

export async function createBoard(board: { title: string }) {
  let { data: boards, error } = await supabase
    .from("boards")
    .insert([{ title: board.title }])
    .select("*");
  if (error) {
    console.error("Error creating board:", error);
  }
  console.log("createBoard Supabase:", boards);
  console.log("createBoard Supabase error:", error);
  return boards;
}

export function savedBoards(boards: Board[]) {
  localStorage.setItem("boards", JSON.stringify(boards));
}

export function getProfilName() {
  const storedProfilName = localStorage.getItem("profilname");
  const profilName: Profilname = storedProfilName
    ? JSON.parse(storedProfilName)
    : "Jasmin";

  return profilName;
}

export function savedprofilName(profilname: string) {
  localStorage.setItem("profilname", JSON.stringify(profilname));
}
