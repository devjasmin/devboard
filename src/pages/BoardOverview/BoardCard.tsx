import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

type BoardCardProps = {
  id: string;
  title: string;
};

const BoardCardProps = (props: BoardCardProps) => {
  props.id;
  props.title;
};

function BoardCard(props: BoardCardProps) {
  return (
    <Link to={`/boards/props.id`}>
      <Card className="border transition-shadow hover:shadow-md border-black mb-4 bg-slate-300">
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>Spalten 3 - 0 Task </CardDescription>
          <CardAction>
            <Button
              className="hover:text-destructive"
              size="icon"
              variant="ghost"
            >
              <Trash2 />
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default BoardCard;
