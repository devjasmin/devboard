import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PencilIcon, Check, X } from "lucide-react";
import BoardDetailCard from "./BoardDetailCard";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import type { Task, TaskForm, TaskFormAction, Board } from "./types";
import { getBoards, getTasks, savedBoards, savedTasks } from "../api";

function taskFormReducer(state: TaskForm, action: TaskFormAction) {
  if (action.type === "RESET") {
    return {
      title: "",
      description: "",
      assignedTo: "",
      deadline: "",
    };
  }

  return {
    ...state,
    [action.field]: action.value,
  };
}

function BoardDetail() {
  const [taskForm, dispatch] = useReducer(taskFormReducer, {
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
  });

  const { id } = useParams();

  const boards = getBoards();

  const selectBoard = boards.find((board) => board.id === id);

  const [boardName, setBoardName] = useState(selectBoard?.title ?? "");
  const [editBoardName, setEditBoardName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [tasks, setTasks] = useState<Task[]>(getTasks());

  const changeTaskStatus = (id: number, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((tasks) =>
        tasks.id === id ? { ...tasks, status: newStatus } : tasks,
      ),
    );
  };

  function handleCreateTask(status: string) {
    const newTask: Task = {
      id: Date.now(),
      title: taskForm.title,
      description: taskForm.description,
      assignedTo: taskForm.assignedTo,
      deadline: taskForm.deadline,
      status: status,
    };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];

      savedTasks(updatedTasks);

      return updatedTasks;
    });

    dispatch({ type: "RESET" });
  }

  function handleEditBoardName() {
    setEditBoardName(boardName);
    setIsEditing(true);
  }

  function handleOkBoardName() {
    setBoardName(editBoardName);
    setIsEditing(false);

    const updatedBoards = boards.map((board) =>
      board.id === id ? { ...board, title: editBoardName } : board,
    );
    savedBoards(updatedBoards);
  }

  function handleCancleBoardName() {
    setEditBoardName(boardName);
    setIsEditing(false);
  }

  function handleDeleteTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <div className="flex flex-row gap-6 mt-4 ml-5 p-4">
        <Link to={`/boards/`}>
          <Button
            className="hover:text-destructive"
            size="icon"
            variant="ghost"
          >
            <MoveLeftIcon />
          </Button>
        </Link>
        {isEditing ? (
          <>
            <Input
              className="w-60"
              value={editBoardName}
              onChange={(e) => setEditBoardName(e.target.value)}
            />
            <Button
              className="hover:text-destructive"
              size="icon"
              variant="ghost"
              onClick={handleOkBoardName}
            >
              <Check />
            </Button>
            <Button
              className="hover:text-destructive"
              size="icon"
              variant="ghost"
              onClick={handleCancleBoardName}
            >
              <X />
            </Button>
          </>
        ) : (
          <>
            <div>{boardName}</div>
            <Button
              className="hover:text-destructive"
              size="icon"
              variant="ghost"
              onClick={handleEditBoardName}
            >
              <PencilIcon />
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-col-3">
        <BoardDetailCard
          title="Neu"
          count={0}
          tasks={tasks}
          status="todo"
          changeTaskStatus={changeTaskStatus}
          taskForm={taskForm}
          dispatch={dispatch}
          handleCreateTask={handleCreateTask}
          handleDeleteTask={handleDeleteTask}
        />

        <BoardDetailCard
          title="in Bearbeitung"
          count={0}
          tasks={tasks}
          status="in Bearbeitung"
          changeTaskStatus={changeTaskStatus}
          taskForm={taskForm}
          dispatch={dispatch}
          handleCreateTask={handleCreateTask}
          handleDeleteTask={handleDeleteTask}
        />

        <BoardDetailCard
          title="Erledigt"
          count={0}
          tasks={tasks}
          status="erledigt"
          changeTaskStatus={changeTaskStatus}
          taskForm={taskForm}
          dispatch={dispatch}
          handleCreateTask={handleCreateTask}
          handleDeleteTask={handleDeleteTask}
        />
      </div>
    </>
  );
}

export default BoardDetail;
