import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

function BoardCard() {
  return (
    <Card>
      <CardTitle>Board</CardTitle>
      <Trash2 className="h-5 w-5" />
      <CardDescription>Spalten 3 </CardDescription>
      <CardDescription>0 Task</CardDescription>
    </Card>
  );
}

export default BoardCard;
