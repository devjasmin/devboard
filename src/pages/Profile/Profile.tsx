import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Profile() {
  return (
    <>
      <h1 className="m-10 font-bold text-2xl">Profil</h1>
      <div className="border-2 border-slate-600 rounded-2xl w-110 h-60 m-6">
        <h2 className="ml-2 mt-5 font-bold">Benutzerprofil ändern</h2>
        <p className="ml-2">Ändere deinen Anzeigenamen für das Kanban-Board.</p>

        <div>
          <title>Name</title>
          <Input className="w-60 m-5 border-slate-600"></Input>
          <br />
          <Button className="p-2 m-6">Speichern</Button>
        </div>
      </div>
    </>
  );
}
export default Profile;
