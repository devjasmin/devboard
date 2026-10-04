import type { Board, Profilname } from "../types";
import { supabase } from "../lib/db";

export async function getBoards() {
  let { data: boards, error } = await supabase.from("boards").select("*");
  if (error) {
    console.error("Error fetching boards:", error);
  }
  // console.log("getBoards Supabase:", boards);
  // console.log("getBoards Supabase error:", error);
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
  // console.log("createBoard Supabase:", boards);
  // console.log("createBoard Supabase error:", error);
  return boards;
}

export async function deleteBoard(board: { id: string }) {
  let { data: boards, error } = await supabase
    .from("boards")
    .delete()
    .eq("id", board.id)
    .select("*");
  if (error) {
    console.error("Error deleting board:", error);
  }
  // console.log("deleteBoard Supabase:", boards);
  // console.log("deleteBoard Supabase error:", error);
  return boards;
}

export async function renameBoard(board: { id: string; title: string }) {
  let { data: boards, error } = await supabase
    .from("boards")
    .update({ title: board.title })
    .eq("id", board.id)
    .select("*");
  if (error) {
    console.error("Error renaming board:", error);
  }
  // console.log("renameBoard Supabase:", boards);
  // console.log("renameBoard Supabase error:", error);
  return boards;
}
// AB HIER GEHT ES MIT TASKS WEITER
export async function getTasks(boardId: string) {
  let { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("board_id", boardId);
  if (error) {
    console.error("Error fetching tasks:", error);
  }
  console.log("TASKS aus Supabase:", tasks);
  return tasks;
}

export async function createTask(task: {
  title: string;
  description: string;
  deadline: string;
  assignedTo: string;
  status: string;
  board_id: string;
}) {
  let { data: tasks, error } = await supabase
    .from("tasks")
    .insert([
      {
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        assignedTo: task.assignedTo,
        status: task.status,
        board_id: task.board_id,
      },
    ])
    .select("*");
  if (error) {
    console.error("Error creating task:", error);
  }
  console.log("createTask Supabase:", tasks);
  console.log("createTask Supabase error:", error);
  return tasks;
}

export async function updateTask(task: {
  id: string;
  title: string;
  description: string;
  deadline: string;
  assignedTo: string;
  status: string;
}) {
  let { data: tasks, error } = await supabase
    .from("tasks")
    .update({
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      assignedTo: task.assignedTo,
      status: task.status,
    })
    .eq("id", task.id)
    .select("*");
  if (error) {
    console.error("Error updating task:", error);
  }
  console.log("updateTask Supabase:", tasks);
  console.log("updateTask Supabase error:", error);
  return tasks;
}

export async function deleteTask(taskId: string) {
  let { data: tasks, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .select("*");
  if (error) {
    console.error("Error deleting task:", error);
  }
  console.log("deleteTask Supabase:", tasks);
  console.log("deleteTask Supabase error:", error);
  return tasks;
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
