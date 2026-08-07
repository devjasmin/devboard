import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PencilIcon, Check, X } from "lucide-react";
import BoardDetailCard from "./BoardDetailCard";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function BoardDetail() {
  const [boardName, setBoardName] = useState("Jasmin");
  const [editBoardName, setEditBoardName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
      <div className="flex flex-row gap-4 mt-4 ml-5">
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
          <div>
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
        <BoardDetailCard title="Neu" count={0} />
        <BoardDetailCard title="in Bearbeitung" count={0} />
        <BoardDetailCard title="Erledigt" count={0} />
      </div>
    </>
  );
}
export default BoardDetail;
