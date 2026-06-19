import { Link } from "react-router-dom";
import {
  Newspaper,
  CalendarDays,
  MessageSquareWarning,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import { PageHeader } from "../components/Layout";
import { Badge, Card } from "../components/ui";
import { useActualites, useEvenements, useSignalements } from "../lib/store";
import { useAuth } from "../lib/auth";
import {
  eventTypeColor,
  fmtDateShort,
  fmtTime,
  statutSignalement,
} from "../lib/format";

export default function Dashboard() {
  const { session } = useAuth();
  const actualites = useActualites();
  const evenements = useEvenements();
  const signalements = useSignalements();

  const now = Date.now();
  const prochains = [...evenements]
    .filter((e) => new Date(e.debut).getTime() >= now - 36e5)
    .sort((a, b) => +new Date(a.debut) - +new Date(b.debut))
    .slice(0, 4);

  const aTraiter = signalements.filter(
    (s) => s.statut === "Nouveau" || s.statut === "En cours",
  );
  const resolus = signalements.filter((s) => s.statut === "Résolu").length;
  const publiees = actualites.filter((a) => a.statut === "Publié").length;

  const recents = [...signalements]
    .sort((a, b) => +new Date(b.dateCreation) - +new Date(a.dateCreation))
    .slice(0, 4);

  const prenom = session?.name.split(" ")[0] ?? "";

  return (
    <>
      <PageHeader
        title={`Bonjour ${prenom} 👋`}
        subtitle="Voici l'essentiel de la vie municipale aujourd'hui."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat
          to="/signalements"
          icon={<MessageSquareWarning size={20} />}
          value={aTraiter.length}
          label="À traiter"
          tone="passion"
        />
        <Stat
          to="/signalements"
          icon={<CheckCircle2 size={20} />}
          value={resolus}
          label="Résolus"
          tone="atelier"
        />
        <Stat
          to="/agenda"
          icon={<CalendarDays size={20} />}
          value={prochains.length}
          label="Évén. à venir"
          tone="marine"
        />
        <Stat
          to="/actualites"
          icon={<Newspaper size={20} />}
          value={publiees}
          label="Publications"
          tone="or"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Agenda */}
        <Card className="p-5">
          <SectionTitle
            title="Prochains rendez-vous"
            to="/agenda"
            icon={<CalendarDays size={18} />}
          />
          <div className="mt-4 space-y-3">
            {prochains.length === 0 && (
              <p className="text-sm text-slate-400">Aucun événement à venir.</p>
            )}
            {prochains.map((e) => (
              <div key={e.id} className="flex items-center gap-3">
                <div className="flex w-12 shrink-0 flex-col items-center rounded-xl bg-marine-50 py-1.5">
                  <span className="text-[10px] font-bold uppercase text-marine-500">
                    {fmtDateShort(e.debut).split(" ")[1]}
                  </span>
                  <span className="text-lg font-extrabold leading-none text-marine-800">
                    {fmtDateShort(e.debut).split(" ")[0]}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-marine-900">
                    {e.titre}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={12} /> {fmtTime(e.debut)}
                    <MapPin size={12} /> <span className="truncate">{e.lieu}</span>
                  </p>
                </div>
                <Badge className={eventTypeColor[e.type]}>{e.type}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Signalements récents */}
        <Card className="p-5">
          <SectionTitle
            title="Derniers signalements"
            to="/signalements"
            icon={<MessageSquareWarning size={18} />}
          />
          <div className="mt-4 space-y-2.5">
            {recents.map((s) => {
              const st = statutSignalement[s.statut];
              return (
                <Link
                  key={s.id}
                  to="/signalements"
                  className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50"
                >
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${st.dot}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-marine-900">
                      {s.titre}
                    </p>
                    <p className="truncate text-xs text-slate-500">{s.adresse}</p>
                  </div>
                  <Badge className={`${st.bg} ${st.text}`}>{s.statut}</Badge>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>
    </>
  );
}

function Stat({
  to,
  icon,
  value,
  label,
  tone,
}: {
  to: string;
  icon: React.ReactNode;
  value: number;
  label: string;
  tone: "passion" | "atelier" | "marine" | "or";
}) {
  const tones: Record<string, string> = {
    passion: "text-passion-600 bg-passion-50",
    atelier: "text-atelier-600 bg-atelier-50",
    marine: "text-marine-600 bg-marine-50",
    or: "text-or-600 bg-or-50",
  };
  return (
    <Link to={to}>
      <Card className="p-4 transition hover:-translate-y-0.5 hover:shadow-md">
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${tones[tone]}`}
        >
          {icon}
        </span>
        <p className="mt-3 text-3xl font-extrabold leading-none text-marine-900">
          {value}
        </p>
        <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
      </Card>
    </Link>
  );
}

function SectionTitle({
  title,
  to,
  icon,
}: {
  title: string;
  to: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 font-bold text-marine-900">
        <span className="text-marine-500">{icon}</span>
        {title}
      </h2>
      <Link
        to={to}
        className="flex items-center gap-1 text-xs font-semibold text-marine-500 hover:text-marine-700"
      >
        Tout voir <ArrowRight size={14} />
      </Link>
    </div>
  );
}
