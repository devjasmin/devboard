import { createContext, useState } from "react";
import { getProfilName } from "../api";

type ProfilContextType = {
  profilName: string;
  setProfilName: React.Dispatch<React.SetStateAction<string>>;
};

type ProfilProviderChildren = {
  children: React.ReactNode;
};

export const ProfilContext = createContext<ProfilContextType | null>(null);

export function ProfilProvider({ children }: ProfilProviderChildren) {
  const [profilName, setProfilName] = useState(getProfilName());

  return (
    <ProfilContext.Provider value={{ profilName, setProfilName }}>
      {children}
    </ProfilContext.Provider>
  );
}
