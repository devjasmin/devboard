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
    setIsEditing(true);
  }
  function handleDeleteBoardName() {
    setEditBoardName(setBoardName);
    setIsEditing(false);
  }

  return (
    <>
      <div className="container">
        <div className="flex flex-row gap-4 mt-5 ml-5">
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
                onClick={handleDeleteBoardName}
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
          <BoardDetailCard />
          <BoardDetailCard />
          <BoardDetailCard />
        </div>
      </div>
    </>
  );
}
export default BoardDetail;
