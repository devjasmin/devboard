import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Dropzone from "./Dropzone";
import TaskCard from "./TaskCard";
import { Input } from "@/components/ui/input";
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
import { DeadlinePicker } from "./DeadlinePicker";
import { SelectDemo } from "./SelectDemo";
import { Textarea } from "@/components/ui/textarea";

type TaskForm = {
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
};

type TaskFormAction = {
  field: "title" | "description" | "assignedTo" | "deadline";
  value: string;
};

type Task = {
  id: number;
  status: string;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
};

function BoardDetailCard({
  title,
  count,
  tasks,
  status,
  changeTaskStatus,
  taskForm,
  dispatch,
  handleCreateTask,
}: {
  title: string;
  count: number;
  tasks: Task[];
  status: string;
  changeTaskStatus: (id: number, newStatus: string) => void;
  taskForm: TaskForm;
  dispatch: React.Dispatch<TaskFormAction>;
  handleCreateTask: (status: string) => void;
}) {
  return (
    <div className="container">
      <Card className="flex flex-grid w-90 h-100 m-3 bg-slate-400 border-4 border-cyan-300 ">
        <CardHeader className="border-b border-slate-700 my-2">
          <div className="flex-space-between flex items-center gap-4">
            <span className="font-bold">{title}</span>
            {count}
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
                  <Button
                    variant={"default"}
                    onClick={() => handleCreateTask(status)}
                  >
                    Erstellen
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Dropzone
            text="Hier klicken"
            status={status}
            changeTaskStatus={changeTaskStatus}
          />
          {tasks.length === 0 && (
            <p className="text-xl mt-30 mb-8 ml-30 mr-20 flex flex-col">
              Keine Tasks vorhanden.
            </p>
          )}
          <div className="flex flex-col gap-3">
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  assignedTo={task.assignedTo}
                  deadline={task.deadline}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BoardDetailCard;
