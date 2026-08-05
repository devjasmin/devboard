import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

function BoardDetailCard() {
  return (
    <div className="container">
      <Card className="flex flex-row-2 w-80 h-40 mt-10 ml-10">
        <CardHeader>
          ToDo 0
          <CardAction>
            <Button
              className="hover:text-destructive"
              size="icon"
              variant="ghost"
            >
              <Plus />
            </Button>
          </CardAction>
          <hr className="font-bold" />
        </CardHeader>
        <CardContent>
          <p className="text-center mt-2">Keine Tasks vorhanden</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default BoardDetailCard;
