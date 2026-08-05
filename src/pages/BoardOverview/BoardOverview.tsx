import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BadgePlus, Trash2 } from "lucide-react";

function BoardOverview() {
  return (
    <>
      <div className="flex flex-row place-content-between text-3xl bg-red-50">
        <h2>Meine Boards</h2>
        <Button variant="default" className="p-4 ">
          <BadgePlus className="size-5" />
          Neues Board
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 bg-red-300">
        <Card>
          <p className="text-xl">Board </p>
          <Trash2 className="size-5" />
          <p className="text-sm p-1.2"> Spalten 3 : </p>
          <p className="text-sm p-1.2"> 0 Task</p>
        </Card>
        <Card>
          <p className="text-xl">Board </p>
          <Trash2 className="size-5" />
          <p className="text-sm p-1.2"> Spalten 3 : </p>
          <p className="text-sm p-1.2"> 0 Task</p>
        </Card>
        <Card>
          <p className="text-xl">Board </p>
          <Trash2 className="size-5" />
          <p className="text-sm p-1.2"> Spalten 3 : </p>
          <p className="text-sm p-1.2"> 0 Task</p>
        </Card>
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
