import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PencilIcon, Check, X } from "lucide-react";
import BoardDetailCard from "./BoardDetailCard";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useParams } from "react-router-dom";

type Board = {
  id: string;
  title: string;
};

function BoardDetail() {
  const { id } = useParams();

  const storedBoards = localStorage.getItem("boards");

  const boards: Board[] = storedBoards ? JSON.parse(storedBoards) : [];

  const selectBoard = boards.find((board) => board.id === id);

  const [boardName, setBoardName] = useState(selectBoard?.title ?? "");
  const [editBoardName, setEditBoardName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Meine erste Aufgabe",
      status: "todo",
    },
    {
      id: 2,
      text: "Meine zweite Aufgabe",
      status: "todo",
    },
    {
      id: 3,
      text: "Meine dritte Aufgabe",
      status: "todo",
    },
    {
      id: 4,
      text: "Meine vierte Aufgabe",
      status: "todo",
    },
  ]);

  const changeTaskStatus = (id: number, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((tasks) =>
        tasks.id === id ? { ...tasks, status: newStatus } : tasks,
      ),
    );
  };

  function handleEditBoardName() {
    setEditBoardName(boardName);
    setIsEditing(true);
  }
  function handleOkBoardName() {
    setBoardName(editBoardName);
    setIsEditing(true);
  }
  function handleCancleBoardName() {
    setEditBoardName(boardName);
    setIsEditing(false);
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
        />

        <BoardDetailCard
          title="in Bearbeitung"
          count={0}
          tasks={tasks}
          status="in Bearbeitung"
          changeTaskStatus={changeTaskStatus}
        />
        <BoardDetailCard
          title="Erledigt"
          count={0}
          tasks={tasks}
          status="erledigt"
          changeTaskStatus={changeTaskStatus}
        />
      </div>
    </>
  );
}
export default BoardDetail;
