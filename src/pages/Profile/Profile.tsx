import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Profile() {
  const [profilName, setProfilName] = useState("Jasmin");
  const [editProfilName, setEditProfilName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function handleEditProfilName() {
    setEditProfilName(profilName);
    setIsEditing(true);
  }
  // function handleOkProfilName() {
  //   setProfilName(editProfilName);
  //   setIsEditing(true);
  // }
  // function handleCancleBoardName() {
  //   setEditProfilName(profilName);
  //   setIsEditing(false);
  // }

  return (
    <>
      <h1 className="m-10 font-bold text-2xl">Profil</h1>
      <Card className="border-2 border-slate-400 rounded-2xl w-110 h-60 m-6 md-auto">
        <CardHeader>
          <CardTitle className="ml-2 mt-5 font-bold">
            Benutzerprofil ändern
          </CardTitle>
          <CardDescription className="ml-2 mb-4">
            Ändere deinen Anzeigenamen für das Kanban-Board.
          </CardDescription>
          <CardContent>
            <label>Name</label>
            <div className="flex-col flex gap-1">
              <Input
                className="md-max mt-4 border-slate-400"
                id="username"
                value={profilName}
              ></Input>
              <Button
                className="mt-4 w-30 hover:cursor-pointer"
                size="lg"
                variant="secondary"
                onClick={handleEditProfilName}
              >
                Speichern
              </Button>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
}

export default Profile;
