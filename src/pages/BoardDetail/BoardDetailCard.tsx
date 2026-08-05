import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";

function BoardDetailCard() {
  return (
    <div className="container">
      <Card className="flex flex-row-2 w-80 h-40 mt-10 ml-10">
        <CardHeader>
          ToDo 0
          <CardAction>
            <Button>
              <Plus />
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}

export default BoardDetailCard;
