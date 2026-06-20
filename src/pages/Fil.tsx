import { Rss } from "lucide-react";
import { EmptyState } from "../components/ui";

export default function Fil() {
  return (
    <EmptyState
      icon={<Rss size={32} />}
      title="Aucune publication pour l'instant"
      hint="Le fil de la majorité sera alimenté par les élus au fil de l'actualité municipale."
    />
  );
}
