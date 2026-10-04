import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PencilIcon, Check, X } from "lucide-react";
import BoardDetailColumn from "./BoardDetailColumn";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Board, Task, TaskForm, TaskFormAction } from "../../types";
import {
  createTask,
  updateTask,
  deleteTask,
  getBoards,
  getTasks,
  renameBoard,
} from "../api";

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
  // console.log("id aus URL:", id);
  // console.log("boards aus supabase:", boards);
  // console.log("gefundes Board:", selectBoard);

  useEffect(() => {
    if (selectBoard) {
      setBoardName(selectBoard.title);
    }
  }, [selectBoard]);

  const [boardName, setBoardName] = useState("");
  const [editBoardName, setEditBoardName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (id) {
        const tasks = await getTasks(id);
        setTasks(tasks ?? []);
      }
    };
    fetchTasks();
  }, [id]);

  const changeTaskStatus = async (taskId: string, newStatus: string) => {
    const selectTask = tasks.find((task) => task.id === taskId);

    if (
      !(
        (selectTask?.status === "todo" && newStatus === "in Bearbeitung") ||
        (selectTask?.status === "in Bearbeitung" && newStatus === "erledigt")
      )
    )
      return;

    const updatedTask = { ...selectTask, status: newStatus };
    const result = await updateTask(updatedTask);

    if (result && result.length > 0) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === taskId ? result[0] : task,
        );
        return updatedTasks;
      });
    }
  };

  async function handleUpdateTask(updateTasks: Task) {
    const updatedTask = await updateTask(updateTasks);

    if (updatedTask && updatedTask.length > 0) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === updateTasks.id ? updatedTask[0] : task,
        );

        return updatedTasks;
      });
    }
  }

  async function handleCreateTask(status: string) {
    if (!taskForm.deadline) {
      console.error(
        "Deadline wurde nicht gesetzt. Task kann nicht erstellt werden",
      );
      return;
    }
    const newTask = await createTask({
      title: taskForm.title,
      description: taskForm.description,
      assignedTo: taskForm.assignedTo,
      deadline: taskForm.deadline,
      status: status,
      board_id: id!,
    });

    if (newTask && newTask.length > 0) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask[0]];
        return updatedTasks;
      });
    }

    dispatch({ type: "RESET" });
  }

  function handleEditBoardName() {
    setEditBoardName(boardName);
    setIsEditing(true);
  }

  async function handleOkBoardName() {
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

  function handleCancelBoardName() {
    setEditBoardName(boardName);
    setIsEditing(false);
  }

  async function handleDeleteTask(taskId: string) {
    const deletedTask = await deleteTask(taskId);

    if (deletedTask && deletedTask.length > 0) {
      setTasks((prevTasks) => {
        const deletedTasks = prevTasks.filter((task) => task.id !== taskId);

        return deletedTasks;
      });
    }
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
              onClick={handleCancelBoardName}
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
