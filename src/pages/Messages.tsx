import { MessageSquare } from "lucide-react";
import { EmptyState } from "../components/ui";

export default function Messages() {
  return (
    <EmptyState
      icon={<MessageSquare size={32} />}
      title="Messagerie en cours de déploiement"
      hint="La messagerie interne entre élus sera disponible prochainement."
    />
  );
}
