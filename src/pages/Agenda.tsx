import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui";
import { CONSEILS, PROCHAIN_CONSEIL } from "../lib/conseils";

const MOIS: Record<string, string> = {
  "01": "JANV",
  "02": "FÉV",
  "03": "MARS",
  "04": "AVR",
  "05": "MAI",
  "06": "JUIN",
  "07": "JUIL",
  "08": "AOÛT",
  "09": "SEPT",
  "10": "OCT",
  "11": "NOV",
  "12": "DÉC",
};

export default function Agenda() {
  const navigate = useNavigate();

  return (
    <div className="flex max-w-[760px] flex-col gap-3.5">
      <p className="text-[13px] text-ink-muted">
        Séances du conseil municipal 2026 ·{" "}
        <button
          onClick={() => navigate("/documents")}
          className="font-semibold text-accent"
        >
          Voir les délibérations →
        </button>
      </p>

      {/* Prochain conseil */}
      {(() => {
        const [, mm, dd] = PROCHAIN_CONSEIL.date.split("-");
        return (
          <Card className="flex items-center gap-4 px-5 py-4" style={{ boxShadow: "inset 3px 0 0 #2F6BFF" }}>
            <div className="w-[62px] shrink-0 text-center">
              <div className="font-display text-[26px] font-bold leading-none" style={{ color: "#2F6BFF" }}>
                {dd}
              </div>
              <div className="mt-1 text-[11px] font-bold tracking-wider text-ink-soft">
                {MOIS[mm]}
              </div>
            </div>
            <div className="w-px self-stretch bg-line-soft" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-display text-base font-semibold text-ink">Conseil municipal</span>
                <span className="rounded-full bg-royal-50 px-2.5 py-0.5 text-[11px] font-bold text-royal-500">Conseil</span>
                <span className="rounded-full border border-warn/40 bg-warn/10 px-2.5 py-0.5 text-[10.5px] font-bold text-warn">Date provisoire</span>
              </div>
              <div className="mt-1 text-[13px] text-ink-muted">
                {PROCHAIN_CONSEIL.heure} · {PROCHAIN_CONSEIL.lieu.split("—")[0].trim()}
              </div>
            </div>
          </Card>
        );
      })()}

      <div className="border-t border-line-soft pt-1">
        <p className="mb-3.5 text-[11px] font-bold tracking-[0.1em] text-ink-soft">SÉANCES PASSÉES</p>
      </div>

      {CONSEILS.map((c) => {
        const [, mm, dd] = c.date.split("-");
        return (
          <Card
            key={c.id}
            className="flex items-center gap-4 px-5 py-4"
          >
            <div className="w-[62px] shrink-0 text-center">
              <div className="font-display text-[26px] font-bold leading-none text-ink">
                {dd}
              </div>
              <div className="mt-1 text-[11px] font-bold tracking-wider text-ink-soft">
                {MOIS[mm]}
              </div>
            </div>
            <div className="w-px self-stretch bg-line-soft" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-display text-base font-semibold text-ink">
                  Conseil municipal
                </span>
                <span className="rounded-full bg-royal-50 px-2.5 py-0.5 text-[11px] font-bold text-royal-500">
                  Conseil
                </span>
                {c.diffuse && (
                  <span className="rounded-full bg-[#E9F6F0] px-2.5 py-0.5 text-[11px] font-bold text-[#1E8E5A]">
                    Filmée
                  </span>
                )}
              </div>
              <div className="mt-1 text-[13px] text-ink-muted">
                {c.heure} · {c.lieu.split("—")[0].trim()}
              </div>
              <div className="mt-0.5 text-[12px] text-ink-soft">
                {c.delibs.length} délibération
                {c.delibs.length > 1 ? "s" : ""}
              </div>
            </div>
            <button
              onClick={() => navigate("/documents")}
              className="shrink-0 rounded-[10px] border border-line bg-panel-2 px-3.5 py-2 text-[13px] font-semibold text-ink transition hover:border-marine-200"
            >
              Voir →
            </button>
          </Card>
        );
      })}
    </div>
  );
}
