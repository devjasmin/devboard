import type { Board, Task, Profilname } from "../pages/BoardDetail/types";

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
