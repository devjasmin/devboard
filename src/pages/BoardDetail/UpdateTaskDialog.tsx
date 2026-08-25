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
import { Children, type PropsWithChildren } from "react";
import TaskCard from "./TaskCard";

type UpdateTaskDialogProps = {
  task: Task;
  taskForm: TaskForm;
  dispatch: React.Dispatch<TaskFormAction>;
  status: string;
  handleUpdateTask: (updatedTask: Task) => void;
  children: React.ReactNode;
};

export function UpdateTaskDialog({
  handleUpdateTask,
  taskForm,
  dispatch,
  status,
  task,
  children,
}: UpdateTaskDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
            onClick={() => handleUpdateTask({ ...task, ...taskForm })}
          >
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
