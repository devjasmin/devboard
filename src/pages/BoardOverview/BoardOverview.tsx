import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgePlus } from "lucide-react";
import BoardCard from "./BoardCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// const [nameBoard, setNameBoard] useState("");

function BoardOverview() {
  return (
    <>
      <div className="flex flex-row place-content-between mt-5 mb-2 text-3xl bg-white">
        <h2>Meine Boards</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              // onClick={handleCreateBoard}
              variant="default"
              className="p-4 font-bold bg-cyan-300 text-black "
            >
              <BadgePlus className="size-5" />
              Neues Board
            </Button>
          </DialogTrigger>

          <DialogContent className="w-100 h-50">
            <DialogHeader>
              <DialogTitle>Neues Board erstellen</DialogTitle>

              <DialogDescription>
                Gib dem Board einen Namen. Es werden automatisch drei Spalten
                angelegt (Neu, in Bearbeitung, Erledigt).
              </DialogDescription>
            </DialogHeader>

            <Input
              className="border-2 border-cyan-400"
              placeholder="Board-Name"
            />

            <DialogFooter>
              <Button variant={"outline"}>Abbrechen</Button>
              <Button variant={"default"}>Erstellen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
