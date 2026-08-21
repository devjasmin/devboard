export type Task = {
  id: number;
  status: string;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
};

export type Board = {
  id: string;
  title: string;
};

export type TaskForm = {
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
};

export type TaskFormAction = {
  field: "title" | "description" | "assignedTo" | "deadline";
  value: string;
};
