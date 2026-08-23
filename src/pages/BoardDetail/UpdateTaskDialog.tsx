import { Button } from "@/components/ui/button";
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

type UpdateTaskDialogProps = {
  task: Task;
  taskForm: TaskForm;
  dispatch: React.Dispatch<TaskFormAction>;
  status: string;
  handleUpdateTask: Task;
};

export function UpdateTaskDialog({
  taskForm,
  dispatch,
  status,
  handleUpdateTask,
}: UpdateTaskDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DialogContent className="w-110 h-90">
          <DialogHeader>
            <DialogTitle>Neue Aufgabe bearbeiten</DialogTitle>
            <DialogDescription>
              Bearbeite die Aufgabe für diese Spalte
            </DialogDescription>
            <DialogTitle>Titel</DialogTitle>
            <DialogDescription>
              <Input
                className="border-2 border-cyan-300"
                placeholder="Task-Titel"
                value={taskForm.title}
                onChange={(e) =>
                  dispatch({
                    type: "CHANGE",
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
                  type: "CHANGE",
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
                  type: "CHANGE",
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
                  type: "CHANGE",
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
            <Button
              variant={"default"}
              onClick={() => handleUpdateTask(status)}
            >
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogTrigger>
    </Dialog>
  );
}
