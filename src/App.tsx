import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./lib/auth";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Actualites from "./pages/Actualites";
import Agenda from "./pages/Agenda";
import Signalements from "./pages/Signalements";
import Elus from "./pages/Elus";

function Protected({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
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
        <Route index element={<Dashboard />} />
        <Route path="actualites" element={<Actualites />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="signalements" element={<Signalements />} />
        <Route path="elus" element={<Elus />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
