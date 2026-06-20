import { Card, ProgressBar } from "../components/ui";
import { PROJETS, PROJETS_STATS } from "../lib/cockpit";

export default function Projets() {
  return (
    <div>
      <div className="mb-[18px] grid max-w-[560px] grid-cols-3 gap-3.5">
        {PROJETS_STATS.map((s) => (
          <Card key={s.label} className="px-4 py-4">
            <div
              className="font-display text-2xl font-bold"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div className="text-[12.5px] text-ink-muted">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        {/* En-tête tableau (desktop) */}
        <div className="hidden grid-cols-[1fr_200px_150px_120px] gap-4 border-b border-line-soft px-[22px] py-3.5 text-[11px] font-bold tracking-wide text-ink-soft md:grid">
          <span>PROJET</span>
          <span>RESPONSABLE</span>
          <span>AVANCEMENT</span>
          <span>ÉCHÉANCE</span>
        </div>

        {PROJETS.map((p) => (
          <div
            key={p.name}
            className="grid grid-cols-1 items-center gap-4 border-b border-line-soft px-[22px] py-4 last:border-0 md:grid-cols-[1fr_200px_150px_120px]"
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold text-ink">{p.name}</div>
              <span
                className="mt-1.5 inline-flex rounded-full bg-panel-2 px-2.5 py-0.5 text-[11px] font-semibold"
                style={{ color: p.sc }}
              >
                {p.status}
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[9px] text-[11px] font-bold text-white"
                style={{ background: p.sc }}
              >
                {p.ini}
              </span>
              <div className="min-w-0">
                <div className="text-[12.5px] font-medium text-ink">{p.who}</div>
                <div className="truncate text-[11px] text-ink-soft">{p.deleg}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <ProgressBar value={p.progress} color={p.sc} className="flex-1" />
              <span
                className="text-xs font-bold"
                style={{ color: p.sc }}
              >
                {p.progress}%
              </span>
            </div>

            <div className="text-[13px] text-ink-muted">
              <span className="md:hidden">Échéance : </span>
              {p.due}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
