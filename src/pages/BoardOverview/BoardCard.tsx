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

function BoardCard() {
  return (
    <Link to={`/boards/1`}>
      <Card className="border transition-shadow hover:shadow-md border-black mb-4">
        <CardHeader>
          <CardTitle>Name des Board</CardTitle>
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
