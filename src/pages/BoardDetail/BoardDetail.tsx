import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PencilIcon } from "lucide-react";

function BoardDetail() {
  return (
    <>
      <div className="container">
        <div className="flex flex-row gap-4 mt-5 ml-5">
          <Button
            className="hover:text-destructive"
            size="icon"
            variant="ghost"
          >
            <MoveLeftIcon />
          </Button>
          <h1>Neuer Board name</h1>
          <Button
            className="hover:text-destructive"
            size="icon"
            variant="ghost"
          >
            <PencilIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
export default BoardDetail;
