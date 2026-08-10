import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import Dropzone from "./Dropzone";
import TaskCard from "./TaskCard";

type Task = {
  id: number;
  text: string;
  status: string;
};

function BoardDetailCard({
  title,
  count,
  tasks,
  status,
  changeTaskStatus,
}: {
  title: string;
  count: number;
  tasks: Task[];
  status: string;
  changeTaskStatus: (id: number, newStatus: string) => void;
}) {
  return (
    <div className="container">
      <Card className="flex flex-grid w-80 h-90 m-3 bg-slate-400 ">
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
          <Dropzone
            text="Task hier ablegen"
            status={status}
            changeTaskStatus={changeTaskStatus}
          />
          <div>
            <Card className="flex flex-grid w-70 h-30 mr-2">
              <CardHeader>
                <div className="flex-space-between flex items-center gap-4">
                  <span className="font-bold">{title}</span>

                  <Button
                    className="hover:text-destructive ml-auto"
                    size="icon"
                    variant="ghost"
                  >
                    <Trash2 />
                  </Button>
                </div>

                <div className="flex flex-col gap-1">
                  <CardDescription className="hover:text-destructive">
                    {tasks.map((task) => (
                      <TaskCard key={task.id} id={task.id} text={task.text} />
                    ))}
                    Description
                  </CardDescription>
                  <div>@Jasmin</div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BoardDetailCard;
