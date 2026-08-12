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
import { useReducer, useState } from "react";

type Board = {
  id: string;
  title: string;
};

function BoardOverview() {
  const [nameBoard, setNameBoard] = useState("");
  // const [boards, dispatch] = useReducer(reducer, []);

  type Action =
    | {
        type: "CREATE";
        id: string;
        title: string;
      }
    | {
        type: "DELETE";
        id: string;
      };

  function reducer(state: Board[], action: Action) {
    if (action.type === "CREATE") {
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
        },
      ];
    } else if (action.type === "DELETE") {
      return state.filter((board) => board.id !== action.id);
    }
    return state;
  }

  return (
    <>
      <div className="flex flex-row place-content-between mt-5 mb-2 text-3xl bg-white">
        <h2>Meine Boards</h2>

        <p className="text-xl mt-8 mb-8 ml-80 mr-5 flex flex-col">
          Noch keine Boards vorhanden.
          <span className="text-sm ">
            Erstelle dein erstes Board, um loszulegen
          </span>
        </p>

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
              id="1"
              className="border-2 border-cyan-400"
              value={nameBoard}
              onChange={(e) => setNameBoard(e.target.value)}
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
    </>
  );
}
export default BoardOverview;
