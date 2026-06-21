import { useNavigate } from "react-router-dom";
import { Users, Calendar, FileText } from "lucide-react";
import { Card, Avatar } from "../components/ui";
import { useAuth } from "../lib/auth";
import { ELUS } from "../lib/seed";
import { CONSEILS, PROCHAIN_CONSEIL } from "../lib/conseils";

export default function Accueil() {
  const navigate = useNavigate();
  const { session } = useAuth();

  const rawName = session?.name ?? "";
  const prenom = rawName.includes("@") ? "" : rawName.split(" ")[0];
  const monElu = rawName.includes("@")
    ? null
    : ELUS.find(
        (e) => `${e.prenom} ${e.nom}`.toLowerCase() === rawName.trim().toLowerCase(),
      );

  const nbDelibs = CONSEILS.reduce((sum, c) => sum + c.delibs.length, 0);
  const dernierConseil = CONSEILS[0];

  return (
    <div className="space-y-[18px]">
      {/* Hero */}
      <div
        className="relative overflow-hidden rounded-[18px] px-7 py-[28px] text-white shadow-[0_20px_40px_-24px_rgba(22,50,79,.7)]"
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
          <p className="mb-1.5 text-[13px] text-royal-100/90">
            {prenom ? `Bonjour ${prenom},` : "Bienvenue,"}
          </p>
          <h2 className="font-display max-w-[460px] text-[27px] font-bold leading-[1.15]">
            L'Atelier Majorité
            <br />
            Ferrières-en-Brie
          </h2>
          <p className="mt-2 text-[14px] text-royal-100/75">
            {monElu?.delegation
              ? monElu.delegation
              : "Cockpit des élus de la majorité · Mandature 2026"}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => navigate("/documents")}
              className="rounded-[10px] bg-white px-4 py-2.5 text-[13px] font-semibold text-marine-700"
            >
              Conseils municipaux
            </button>
            <button
              onClick={() => navigate("/annuaire")}
              className="rounded-[10px] border border-white/25 bg-white/[0.14] px-4 py-2.5 text-[13px] font-semibold text-white"
            >
              L'équipe
            </button>
          </div>
        </div>
      </div>

      {/* KPIs réels */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        <Card className="p-5">
          <span
            className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-royal-50"
            style={{ color: "#2F6BFF" }}
          >
            <Users size={17} />
          </span>
          <div className="font-display mt-3 text-[30px] font-bold leading-none text-ink">
            {ELUS.length}
          </div>
          <div className="mt-1 text-[12.5px] text-ink-muted">
            Élus de la majorité
          </div>
        </Card>

        <Card className="p-5">
          <span
            className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-[#E9F6F0]"
            style={{ color: "#1E8E5A" }}
          >
            <Calendar size={17} />
          </span>
          <div className="font-display mt-3 text-[30px] font-bold leading-none text-ink">
            {CONSEILS.length}
          </div>
          <div className="mt-1 text-[12.5px] text-ink-muted">
            Conseils en 2026
          </div>
        </Card>

        <Card className="p-5">
          <span
            className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-[#F7F1E3]"
            style={{ color: "#BE8E3C" }}
          >
            <FileText size={17} />
          </span>
          <div className="font-display mt-3 text-[30px] font-bold leading-none text-ink">
            {nbDelibs}
          </div>
          <div className="mt-1 text-[12.5px] text-ink-muted">
            Délibérations 2026
          </div>
        </Card>
      </div>

      {/* Dernier conseil + équipe */}
      <div className="grid gap-[18px] lg:grid-cols-[1fr_360px]">
        <Card className="p-[22px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-[0.12em] text-ink-soft">
              PROCHAIN CONSEIL
            </span>
            {PROCHAIN_CONSEIL.provisoire && (
              <span className="rounded-full border border-warn/40 bg-warn/10 px-2.5 py-0.5 text-[10.5px] font-bold text-warn">
                Date provisoire
              </span>
            )}
          </div>
          <div className="font-display mt-3 text-[21px] font-bold leading-tight text-ink">
            {PROCHAIN_CONSEIL.dateLabel}
          </div>
          <p className="mt-1 text-[13px] text-ink-muted">
            {PROCHAIN_CONSEIL.lieu.split("—")[0].trim()}
          </p>
          <p className="mt-2.5 text-[12.5px] text-ink-soft">
            {PROCHAIN_CONSEIL.heure}
          </p>
          <div className="mt-4 border-t border-line-soft pt-3.5 text-[12px] text-ink-soft">
            Dernier conseil :{" "}
            <button
              onClick={() => navigate("/documents")}
              className="font-semibold text-accent"
            >
              {dernierConseil.dateLabel} · {dernierConseil.delibs.length} délibérations →
            </button>
          </div>
        </Card>

        <Card className="p-[22px]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-[0.12em] text-ink-soft">
              L'ÉQUIPE
            </span>
            <button
              onClick={() => navigate("/annuaire")}
              className="text-[12.5px] font-semibold text-accent"
            >
              Voir tout
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {ELUS.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-center gap-2.5">
                <Avatar
                  ini={`${e.prenom[0]}${e.nom[0]}`}
                  couleur={e.couleur}
                  size={34}
                />
                <div className="min-w-0">
                  <div className="truncate text-[12.5px] font-semibold text-ink">
                    {e.prenom} {e.nom}
                  </div>
                  <div className="truncate text-[11px] text-ink-muted">
                    {e.fonction}
                  </div>
                </div>
              </div>
            ))}
            <div className="text-[12px] text-ink-soft">
              +{ELUS.length - 5} autres élus →{" "}
              <button
                onClick={() => navigate("/annuaire")}
                className="font-semibold text-accent"
              >
                Annuaire
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
