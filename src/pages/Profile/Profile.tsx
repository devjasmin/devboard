import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { savedprofilName } from "../api";
import { ProfilContext } from "../context/ProfileContext";

function Profile() {
  const profilContext = useContext(ProfilContext);
  const [editProfilName, setEditProfilName] = useState(
    profilContext?.profilName ?? "",
  );

  if (!profilContext) {
    return null;
  }

  return (
    <>
      <h1 className="m-10 font-bold text-2xl">Profil</h1>
      <Card className="border-2 border-slate-600 bg-slate-400 rounded-2xl w-110 h-60 m-6 md-auto">
        <CardHeader>
          <CardTitle className="ml-2 mt-5 font-bold">
            Benutzerprofil ändern
          </CardTitle>
          <CardDescription className="ml-2 mb-4 text-slate-800">
            Ändere deinen Anzeigenamen für das Kanban-Board.
          </CardDescription>
          <CardContent>
            <label>Name</label>
            <div className="flex-col flex gap-1">
              <Input
                className="md-max mt-4 border-slate-500 border-2"
                id="username"
                value={editProfilName}
                onChange={(e) => setEditProfilName(e.target.value)}
              ></Input>
              <Button
                className="mt-4 w-30 hover:cursor-pointer"
                size="lg"
                variant="secondary"
                onClick={() => {
                  savedprofilName(editProfilName);
                  profilContext.setProfilName(editProfilName);
                }}
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
