import { FolderKanban } from "lucide-react";
import { EmptyState } from "../components/ui";

export default function Projets() {
  return (
    <EmptyState
      icon={<FolderKanban size={32} />}
      title="Aucun projet enregistré"
      hint="Les projets et délégations apparaîtront ici une fois renseignés."
    />
  );
}
