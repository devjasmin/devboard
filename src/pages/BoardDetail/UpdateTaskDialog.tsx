import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DeadlinePicker } from "./DeadlinePicker";
import { SelectDemo } from "./SelectDemo";
import type { Task } from "./types";
import { useState } from "react";

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
  handleUpdateTask: (updatedTask: Task) => void;
  children: React.ReactNode;
};

export function UpdateTaskDialog({
  handleUpdateTask,
  task,
  children,
}: UpdateTaskDialogProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [deadline, setDeadline] = useState(task.deadline);

  function handleSaveTask() {
    const savedTask: Task = {
      ...task,
      title,
      description,
      assignedTo,
      deadline,
    };
    console.log("savedTask:", savedTask);
    handleUpdateTask(savedTask);
  }

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </DialogDescription>
          <DialogTitle>Beschreibung</DialogTitle>
          <Textarea
            placeholder="Was soll erledigt werden?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <DialogTitle>Zugewiesen an</DialogTitle>
          <SelectDemo
            value={assignedTo}
            onValueChange={(value) => setAssignedTo(value)}
          />
          <DialogTitle>Deadline:</DialogTitle>
          <DeadlinePicker
            value={deadline}
            onValueChange={(value) => setDeadline(value)}
          />
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Abbrechen</Button>
          </DialogClose>
          <Button variant={"default"} onClick={handleSaveTask}>
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
