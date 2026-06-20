import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./lib/auth";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Accueil from "./pages/Accueil";
import Projets from "./pages/Projets";
import Indicateurs from "./pages/Indicateurs";
import Territoire from "./pages/Territoire";
import Fil from "./pages/Fil";
import Messages from "./pages/Messages";
import Idees from "./pages/Idees";
import Agenda from "./pages/Agenda";
import Documents from "./pages/Documents";
import Annuaire from "./pages/Annuaire";
import Reglages from "./pages/Reglages";

function Protected({ children }: { children: React.ReactNode }) {
  const { session, ready } = useAuth();
  if (!ready)
    return (
      <div className="flex h-screen items-center justify-center bg-app text-sm text-ink-soft">
        Chargement…
      </div>
    );
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route index element={<Accueil />} />
        <Route path="projets" element={<Projets />} />
        <Route path="indicateurs" element={<Indicateurs />} />
        <Route path="territoire" element={<Territoire />} />
        <Route path="fil" element={<Fil />} />
        <Route path="messages" element={<Messages />} />
        <Route path="idees" element={<Idees />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="documents" element={<Documents />} />
        <Route path="annuaire" element={<Annuaire />} />
        <Route path="reglages" element={<Reglages />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
