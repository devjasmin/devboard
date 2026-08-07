import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import BoardCard from "./BoardCard";

function BoardOverview() {
  return (
    <>
      <div className="flex flex-row place-content-between mt-5 mb-2 text-3xl bg-white">
        <h2>Meine Boards</h2>
        <Button
          variant="default"
          className="p-4 font-bold bg-cyan-300 text-black "
        >
          <BadgePlus className="size-5" />
          Neues Board
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        <BoardCard />
      </div>
      <p className="text-xl mt-8 mb-8 ml-80 mr-5 flex flex-col">
        Noch keine Boards vorhanden.
        <span className="text-sm ">
          Erstelle dein erstes Board, um loszulegen
        </span>
      </p>
    </>
  );
}
export default BoardOverview;
