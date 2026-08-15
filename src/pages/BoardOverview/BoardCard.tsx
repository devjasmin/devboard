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
  deleteBoard: (id: string) => void;
};

function BoardCard(props: BoardCardProps) {
  return (
    <Card className="border transition-shadow hover:shadow-md border-black mb-4 bg-slate-300">
      <CardHeader>
        <Link to={`/boards/${props.id}`}>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>Spalten 3 - 0 Task </CardDescription>
        </Link>
        <CardAction>
          <Button
            className="hover:text-destructive"
            size="icon"
            variant="ghost"
            onClick={() => props.deleteBoard(props.id)}
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

export default BoardCard;
