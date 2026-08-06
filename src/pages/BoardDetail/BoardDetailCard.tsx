import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

function BoardDetailCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="container">
      <Card className="flex flex-grid w-80 h-50 m-3 ">
        <CardHeader className="border-b border-slate-700 my-2">
          <div className="flex-space-between flex items-center gap-4">
            <span className="font-bold">{title}</span>
            {count}
            <Button
              className="hover:text-destructive ml-auto"
              size="icon"
              variant="ghost"
            >
              <Plus />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Card>neue Karte</Card>
          </div>
          <p className="text-center mt-2">Keine Tasks vorhanden</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default BoardDetailCard;
