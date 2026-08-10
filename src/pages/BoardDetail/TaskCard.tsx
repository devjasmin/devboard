import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CardProps = {
  text: string;
  id: number;
};

const TaskCard = (props: CardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(`id`, props.id.toString());
  };

  return (
    <Card draggable={true} onDragStart={handleDragStart}>
      <CardHeader>
        <div className="flex-space-between flex items-center ">
          <span className="font-bold">{props.text}</span>

          <Button
            className="hover:text-destructive ml-auto"
            size="icon"
            variant="ghost"
          >
            <Trash2 />
          </Button>
        </div>
      </CardHeader>
      <CardContent>Beschreibung</CardContent>
    </Card>
  );
};

export default TaskCard;
