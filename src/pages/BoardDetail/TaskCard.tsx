import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Task } from "./types";
import { DialogTrigger } from "@/components/ui/dialog";
import type { PropsWithChildren } from "react";

type CardProps = {
  task: Task;
  handleDeleteTask: (id: number) => void;
  handleUpdateTask: (updateTask: Task) => void;
};

const TaskCard = (props: CardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(`id`, props.task.id.toString());
  };

  return (
    <Card draggable={true} onDragStart={handleDragStart}>
      <CardHeader>
        <div className="flex-space-between flex items-center ">
          <span className="font-bold">{props.task.title}</span>

          <Button
            className="hover:text-destructive ml-auto"
            size="icon"
            variant="ghost"
            onClick={() => props.handleDeleteTask(props.task.id)}
          >
            <Trash2 />
          </Button>
        </div>
      </CardHeader>
      <CardContent>{props.task.description}</CardContent>
      <CardContent>{props.task.assignedTo}</CardContent>
      <CardContent>{props.task.deadline}</CardContent>
    </Card>
  );
};

export default TaskCard;
