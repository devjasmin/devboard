import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CardProps = {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
};

const TaskCard = (props: CardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(`id`, props.id.toString());
  };

  return (
    <Card draggable={true} onDragStart={handleDragStart}>
      <CardHeader>
        <div className="flex-space-between flex items-center ">
          <span className="font-bold">{props.title}</span>

          <Button
            className="hover:text-destructive ml-auto"
            size="icon"
            variant="ghost"
          >
            <Trash2 />
          </Button>
        </div>
      </CardHeader>
      <CardContent>{props.description}</CardContent>
      <CardContent>{props.assignedTo}</CardContent>
      <CardContent>{props.deadline}</CardContent>
    </Card>
  );
};

export default TaskCard;
