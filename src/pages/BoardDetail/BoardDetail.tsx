import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PencilIcon, Check, X } from "lucide-react";
import BoardDetailColumn from "./BoardDetailColumn";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Board, Task, TaskForm, TaskFormAction } from "../../types";
import { getBoards, renameBoard, savedBoards } from "../api";

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

  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const boards = await getBoards();
      setBoards(boards ?? []);
    };
    fetchBoards();
  }, []);

  const { id } = useParams();

  const selectBoard = boards.find((board) => board.id === id);
  console.log("id aus URL:", id);
  console.log("boards aus supabase:", boards);
  console.log("gefundes Board:", selectBoard);

  useEffect(() => {
    if (selectBoard) {
      setBoardName(selectBoard.title);
    }
  }, [selectBoard]);

  const [boardName, setBoardName] = useState("");
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

  async function handleOkBoardName() {
    console.log("handleOkBoardName wurde aufgerufen:", id);
    const renamedBoard = await renameBoard({
      id: id!,
      title: editBoardName,
    });
    if (renamedBoard && renamedBoard.length > 0) {
      setBoardName(editBoardName);
      setIsEditing(false);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === id ? { ...board, title: editBoardName } : board,
        ),
      );
    }
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
