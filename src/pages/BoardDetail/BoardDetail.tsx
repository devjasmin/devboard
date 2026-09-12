import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PencilIcon, Check, X } from "lucide-react";
import BoardDetailColumn from "./BoardDetailColumn";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import type { Task, TaskForm, TaskFormAction } from "../../types";
import { getBoards, savedBoards } from "../api";

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

  const [tasks, setTasks] = useState<Task[]>(selectBoard?.tasks || []);

  const changeTaskStatus = (taskId: number, newStatus: string) => {
    setTasks((prevTasks) => {
      const selectTask = prevTasks.find((task) => task.id === taskId);

      if (
        !(
          (selectTask?.status === "todo" && newStatus === "in Bearbeitung") ||
          (selectTask?.status === "in Bearbeitung" && newStatus === "erledigt")
        )
      ) {
        return prevTasks;
      }

      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      );

      const updatedBoards = boards.map((board) =>
        board.id === id ? { ...board, tasks: updatedTasks } : board,
      );

      savedBoards(updatedBoards);
      console.log("update");
      return updatedTasks;
    });
  };

  function handleUpdateTask(updateTasks: Task) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === updateTasks.id ? updateTasks : task,
      );

      const updatedBoards = boards.map((board) =>
        board.id === id ? { ...board, tasks: updatedTasks } : board,
      );

      savedBoards(updatedBoards);
      return updatedTasks;
    });
  }

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

      const updatedBoards = boards.map((board) =>
        board.id === id ? { ...board, tasks: updatedTasks } : board,
      );

      savedBoards(updatedBoards);
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

  function handleDeleteTask(taskId: number) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      const updatedBoards = boards.filter((board) =>
        board.id === id ? { ...board, tasks: updatedTasks } : board,
      );
      savedBoards(updatedBoards);
      return updatedTasks;
    });
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
        <BoardDetailColumn
          title="Neu"
          tasks={tasks}
          status="todo"
          changeTaskStatus={changeTaskStatus}
          taskForm={taskForm}
          dispatch={dispatch}
          handleCreateTask={handleCreateTask}
          handleDeleteTask={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
        />

        <BoardDetailColumn
          title="in Bearbeitung"
          tasks={tasks}
          status="in Bearbeitung"
          changeTaskStatus={changeTaskStatus}
          taskForm={taskForm}
          dispatch={dispatch}
          handleCreateTask={handleCreateTask}
          handleDeleteTask={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
        />

        <BoardDetailColumn
          title="Erledigt"
          tasks={tasks}
          status="erledigt"
          changeTaskStatus={changeTaskStatus}
          taskForm={taskForm}
          dispatch={dispatch}
          handleCreateTask={handleCreateTask}
          handleDeleteTask={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
        />
      </div>
    </>
  );
}

export default BoardDetail;
