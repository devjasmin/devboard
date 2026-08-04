import { Button } from "@/components/ui/button";

function BoardOverview() {
  return (
    <>
      <div className="flex grid-col gap-30 mt-10 ml-10">
        <h4>Meine Boards</h4>
        <Button>Neues Board</Button>
      </div>
      <br />
      <div className="border-amber-500 border-4">Board 3 Spalten 0 Task</div>
    </>
  );
}
export default BoardOverview;
