import { Lightbulb } from "lucide-react";
import { EmptyState } from "../components/ui";

export default function Idees() {
  return (
    <EmptyState
      icon={<Lightbulb size={32} />}
      title="Aucune idée soumise"
      hint="La boîte à idées de la majorité sera disponible prochainement."
    />
  );
}
