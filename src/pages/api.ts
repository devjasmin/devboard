import type { Board, Task } from "../pages/BoardDetail/types";

export function getBoards() {
  const storedBoards = localStorage.getItem("boards");
  const boards: Board[] = storedBoards ? JSON.parse(storedBoards) : [];

  return boards;
}

export function savedBoards(boards: Board[]) {
  localStorage.setItem("boards", JSON.stringify(boards));
}

export function getTasks() {
  const storedTasks = localStorage.getItem("tasks");
  const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

  return tasks;
}

export function savedTasks(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
