import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DeadlinePicker } from "./DeadlinePicker";
import { SelectDemo } from "./SelectDemo";
import type { Task, TaskForm, TaskFormAction } from "./types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import type React from "react";

type CreateTaskDialogProps = {
  taskForm: TaskForm;
  dispatch: React.Dispatch<TaskFormAction>;
  status: string;
  handleCreateTask: (status: string) => void;
};

export function CreateTaskDialog({
  taskForm,
  dispatch,
  status,
  handleCreateTask,
}: CreateTaskDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="hover:text-destructive ml-auto"
          size="icon"
          variant="ghost"
        >
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-110 h-90">
        <DialogHeader>
          <DialogTitle>Neue Aufgabe erstellen</DialogTitle>
          <DialogDescription>
            Erstelle eine neue Aufgabe für diese Spalte
          </DialogDescription>
          <DialogTitle>Titel</DialogTitle>
          <DialogDescription>
            <Input
              className="border-2 border-cyan-300"
              placeholder="Task-Titel"
              value={taskForm.title}
              onChange={(e) =>
                dispatch({
                  field: "title",
                  value: e.target.value,
                })
              }
            />
          </DialogDescription>
          <DialogTitle>Beschreibung</DialogTitle>
          <Textarea
            placeholder="Was soll erledigt werden?"
            value={taskForm.description}
            onChange={(e) =>
              dispatch({
                field: "description",
                value: e.target.value,
              })
            }
          />
          <DialogTitle>Zugewiesen an</DialogTitle>
          <SelectDemo
            value={taskForm.assignedTo}
            onValueChange={(value) =>
              dispatch({
                field: "assignedTo",
                value,
              })
            }
          />
          <DialogTitle>Deadline:</DialogTitle>
          <DeadlinePicker
            value={taskForm.deadline}
            onValueChange={(value) => {
              console.log(value);

              dispatch({
                field: "deadline",
                value,
              });
            }}
          />
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Abbrechen</Button>
          </DialogClose>
          <Button variant={"default"} onClick={() => handleCreateTask(status)}>
            Erstellen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
