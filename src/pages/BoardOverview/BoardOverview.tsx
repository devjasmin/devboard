import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgePlus } from "lucide-react";
import BoardCard from "./BoardCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useReducer, useState, useEffect } from "react";
import type { Board } from "../../types";
import { createBoard, deleteBoard, getBoards } from "../api";

function BoardOverview() {
  const [nameBoard, setNameBoard] = useState("");

  useEffect(() => {
    const storedBoards = async () => {
      const boards = await getBoards();
      dispatch({ type: "LOAD", boards: boards ?? [] });
    };
    storedBoards();
  }, []);

  const [boards, dispatch] = useReducer(reducer, []);

  type Action =
    | {
        type: "CREATE";
        id: string;
        title: string;
      }
    | {
        type: "DELETE";
        id: string;
      }
    | {
        type: "RENAME";
        id: string;
        title: string;
      }
    | {
        type: "LOAD";
        boards: Board[];
      };

  function reducer(state: Board[], action: Action) {
    if (action.type === "CREATE") {
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          tasks: [],
        },
      ];
    } else if (action.type === "DELETE") {
      return state.filter((board) => board.id !== action.id);
    } else if (action.type === "RENAME") {
      return state.map((board) => {
        if (board.id !== action.id) {
          return board;
        }
        return { ...board, title: action.title };
      });
    } else if (action.type === "LOAD") {
      return action.boards;
    }

    return state;
  }
  async function handleCreateBoard(title: string) {
    console.log("handleCreateBoard wurde aufgerufen:", title);
    const newBoard = await createBoard({ title: title });
    if (newBoard) {
      dispatch({
        type: "CREATE",
        id: newBoard[0].id,
        title: newBoard[0].title,
      });
    }
    return newBoard;
  }

  async function handleDeleteBoard(id: string) {
    console.log("handleDeleteBoard wurde aufgerufen:", id);
    const deletedBoard = await deleteBoard({ id: id });
    if (deletedBoard) {
      dispatch({
        type: "DELETE",
        id: deletedBoard[0].id,
      });
    }
    return deletedBoard;
  }

  return (
    <>
      <div className="flex flex-row place-content-between mt-5 mb-2 text-3xl bg-white">
        <h2>Meine Boards</h2>
        {boards.length === 0 && (
          <p className="text-xl mt-30 mb-8 ml-30 mr-20 flex flex-col">
            Noch keine Boards vorhanden.
            <span className="text-sm ">
              Erstelle dein erstes Board, um loszulegen
            </span>
          </p>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button
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
              <DialogClose asChild>
                <Button variant={"outline"}>Abbrechen</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant={"default"}
                  onClick={() => handleCreateBoard(nameBoard)}
                >
                  Erstellen
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            id={board.id}
            title={board.title}
            handleDeleteBoard={handleDeleteBoard}
          />
        ))}
      </div>
    </>
  );
}
export default BoardOverview;
