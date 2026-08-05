import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PencilIcon } from "lucide-react";
import BoardDetailCard from "./BoardDetailCard";
import { Link } from "react-router-dom";

function BoardDetail() {
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

          <h1>Neuer Board name</h1>
          <Button
            className="hover:text-destructive"
            size="icon"
            variant="ghost"
          >
            <PencilIcon />
          </Button>
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
