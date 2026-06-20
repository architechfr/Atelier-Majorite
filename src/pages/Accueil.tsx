import { useNavigate } from "react-router-dom";
import {
  FolderKanban,
  FileText,
  Users,
  MessageSquare,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { Card, CardHead, Avatar, ProgressBar, Button } from "../components/ui";
import { useAuth } from "../lib/auth";
import {
  DASH_KPIS,
  PROCHAIN_CONSEIL,
  FIL,
  DELEGATIONS,
  TOP_IDEE,
} from "../lib/cockpit";

const KPI_ICONS: Record<string, LucideIcon> = {
  projets: FolderKanban,
  docs: FileText,
  presence: Users,
  messages: MessageSquare,
};

export default function Accueil() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const prenom = session?.name.split(" ")[0] ?? "Florian";

  return (
    <div className="space-y-[18px]">
      {/* Hero + prochain conseil */}
      <div className="grid gap-[18px] lg:grid-cols-[1fr_360px]">
        <div
          className="relative overflow-hidden rounded-[18px] px-7 py-[26px] text-white shadow-[0_20px_40px_-24px_rgba(22,50,79,.7)]"
          style={{ background: "var(--c-hero)" }}
        >
          <div
            className="pointer-events-none absolute -right-10 -top-12 h-56 w-56 rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(127,176,255,.5),transparent 70%)",
            }}
          />
          <div className="relative">
            <p className="mb-1.5 text-[13px] text-royal-100/90">Bonjour {prenom},</p>
            <h2 className="font-display max-w-[430px] text-[27px] font-bold leading-[1.15]">
              3 dossiers attendent votre relecture avant le conseil de jeudi.
            </h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button
                onClick={() => navigate("/documents")}
                className="rounded-[10px] bg-white px-4 py-2.5 text-[13px] font-semibold text-marine-700"
              >
                Relire les délibérations
              </button>
              <button
                onClick={() => navigate("/fil")}
                className="rounded-[10px] border border-white/25 bg-white/[0.14] px-4 py-2.5 text-[13px] font-semibold text-white"
              >
                Voir le fil
              </button>
            </div>
          </div>
        </div>

        <Card className="flex flex-col p-[22px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-[0.12em] text-ink-soft">
              PROCHAIN CONSEIL
            </span>
            <span className="rounded-full bg-royal-50 px-2.5 py-0.5 text-[11px] font-bold text-royal-500">
              {PROCHAIN_CONSEIL.badge}
            </span>
          </div>
          <div className="font-display mt-3 text-[21px] font-bold leading-tight text-ink">
            {PROCHAIN_CONSEIL.date}
          </div>
          <p className="mt-1 text-[13px] text-ink-muted">{PROCHAIN_CONSEIL.lieu}</p>
          <div className="mt-4 flex items-center">
            {PROCHAIN_CONSEIL.avatars.map((a, i) => (
              <span
                key={a.ini}
                className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-white ring-2 ring-[var(--c-panel)]"
                style={{ background: a.c, marginLeft: i ? -8 : 0 }}
              >
                {a.ini}
              </span>
            ))}
            <span
              className="grid h-7 w-7 place-items-center rounded-full bg-panel-2 text-[10px] font-bold text-ink-muted ring-2 ring-[var(--c-panel)]"
              style={{ marginLeft: -8 }}
            >
              +24
            </span>
            <span className="ml-2.5 text-xs text-ink-soft">
              {PROCHAIN_CONSEIL.convoques} convoqués
            </span>
          </div>
        </Card>
      </div>

      {/* Bandeau KPI */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {DASH_KPIS.map((k) => {
          const Icon = KPI_ICONS[k.key];
          return (
            <Card key={k.key} className="p-4">
              <span
                className="grid h-[34px] w-[34px] place-items-center rounded-[10px]"
                style={{ background: k.tint, color: k.icon }}
              >
                <Icon size={17} />
              </span>
              <div className="font-display mt-3 text-[28px] font-bold leading-none text-ink">
                {k.value}
              </div>
              <div className="mt-1 text-[12.5px] text-ink-muted">{k.label}</div>
              <div
                className="mt-1.5 text-[11.5px] font-semibold"
                style={{ color: k.noteColor }}
              >
                {k.note}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Fil + cartes latérales */}
      <div className="grid gap-[18px] lg:grid-cols-[1fr_372px]">
        <Card className="p-[22px]">
          <CardHead
            title="Fil de la majorité"
            action={
              <button
                onClick={() => navigate("/fil")}
                className="text-[12.5px] font-semibold text-accent"
              >
                Tout voir
              </button>
            }
            className="mb-3.5"
          />
          <div className="flex flex-col">
            {FIL.slice(0, 3).map((p, i) => (
              <div
                key={p.id}
                className={`flex gap-3.5 py-3.5 ${
                  i < 2 ? "border-b border-line-soft" : ""
                }`}
              >
                <Avatar ini={p.ini} couleur={p.couleur} size={38} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13.5px] font-semibold text-ink">
                      {p.nom}
                    </span>
                    <span className="text-[11px] text-ink-soft">{p.role}</span>
                    <span
                      className="rounded-full px-1.5 py-px text-[10.5px] font-bold"
                      style={{ background: p.tagBg, color: p.tagText }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-muted">
                    {p.corps}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-[18px]">
          <Card className="p-[22px]">
            <CardHead
              title="Mes délégations"
              action={
                <button
                  onClick={() => navigate("/projets")}
                  className="text-[12.5px] font-semibold text-accent"
                >
                  Détails
                </button>
              }
              className="mb-4"
            />
            <div className="space-y-4">
              {DELEGATIONS.map((d) => (
                <div key={d.label}>
                  <div className="mb-1.5 flex justify-between text-[13px]">
                    <span className="font-medium text-ink">{d.label}</span>
                    <span className="font-bold" style={{ color: d.color }}>
                      {d.pct} %
                    </span>
                  </div>
                  <ProgressBar value={d.pct} color={d.color} />
                </div>
              ))}
            </div>
          </Card>

          <div
            className="rounded-[18px] border border-royal-100 p-[22px]"
            style={{
              background: "linear-gradient(140deg,#F7F9FD,#EEF3FF)",
            }}
          >
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="grid h-[30px] w-[30px] place-items-center rounded-[9px] bg-royal-500 text-white">
                <Lightbulb size={16} />
              </span>
              <span className="font-display text-[15px] font-bold text-marine-900">
                Idée la plus soutenue
              </span>
            </div>
            <p className="text-sm font-semibold leading-snug text-marine-900">
              {TOP_IDEE.titre}
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-royal-500"
                  style={{ width: `${(TOP_IDEE.pour / TOP_IDEE.total) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-royal-500">
                {TOP_IDEE.pour} / {TOP_IDEE.total}
              </span>
            </div>
            <Button
              onClick={() => navigate("/idees")}
              className="mt-3.5 w-full"
            >
              Voter dans la boîte à idées
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
