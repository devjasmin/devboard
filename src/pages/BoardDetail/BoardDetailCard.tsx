import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Dropzone from "./Dropzone";
import TaskCard from "./TaskCard";
import { CreateTaskDialog } from "./CreateTaskDialog";
import type { Task, TaskForm, TaskFormAction } from "./types";

function BoardDetailCard({
  title,
  count,
  tasks,
  status,
  changeTaskStatus,
  taskForm,
  dispatch,
  handleCreateTask,
}: {
  title: string;
  count: number;
  tasks: Task[];
  status: string;
  changeTaskStatus: (id: number, newStatus: string) => void;
  taskForm: TaskForm;
  dispatch: React.Dispatch<TaskFormAction>;
  handleCreateTask: (status: string) => void;
}) {
  return (
    <div className="container">
      <Card className="flex flex-grid w-90 h-auto m-3 bg-slate-400 border-4 border-cyan-300 ">
        <CardHeader className="border-b border-slate-700 my-2">
          <div className="flex-space-between flex items-center gap-2">
            <span className="font-bold">{title}</span>
            {count}

            <CreateTaskDialog
              taskForm={taskForm}
              dispatch={dispatch}
              status={status}
              handleCreateTask={handleCreateTask}
            />
          </div>
        </CardHeader>

        <CardContent>
          <Dropzone
            text="Hier klicken"
            status={status}
            changeTaskStatus={changeTaskStatus}
          />

          {tasks.filter((task) => task.status === status).length === 0 && (
            <p className="text-xl mt-20 mb-8 ml-20 mr-20 flex flex-col">
              keine Tasks vorhanden
            </p>
          )}

          <div className="flex flex-col gap-3">
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  assignedTo={task.assignedTo}
                  deadline={task.deadline}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BoardDetailCard;
