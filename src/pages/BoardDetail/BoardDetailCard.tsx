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
      <Card className="flex flex-row-2 w-90 h-50 mt-10 ml-10 ">
        <CardHeader className="border-b my-2">
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
        </CardHeader>
        <CardContent>
          <p className="text-center mt-2">Keine Tasks vorhanden</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default BoardDetailCard;
