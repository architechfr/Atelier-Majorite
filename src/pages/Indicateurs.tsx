import { Card, CardHead, ProgressBar } from "../components/ui";
import { KPI_INDICATEURS, BARS, REPARTITION } from "../lib/cockpit";

export default function Indicateurs() {
  return (
    <div className="space-y-[18px]">
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {KPI_INDICATEURS.map((k) => (
          <Card key={k.label} className="p-[18px]">
            <div className="text-[12.5px] text-ink-muted">{k.label}</div>
            <div
              className="font-display mt-2 text-[30px] font-bold leading-none"
              style={{ color: k.tone }}
            >
              {k.value}
            </div>
            <div className="mt-1.5 text-[11.5px] text-ink-soft">{k.delta}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-[18px] lg:grid-cols-[1fr_320px]">
        <Card className="px-6 py-[22px]">
          <div className="font-display text-base font-bold text-ink">
            Demandes citoyens traitées
          </div>
          <div className="mb-5 mt-1 text-[12.5px] text-ink-soft">
            Six derniers mois · guichet unique
          </div>
          <div className="flex h-[180px] items-end gap-4 px-1.5">
            {BARS.map((b) => (
              <div
                key={b.m}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className="w-full max-w-[42px] rounded-t-lg"
                  style={{
                    height: `${b.h}%`,
                    background: "linear-gradient(180deg,#2F6BFF,#7FB0FF)",
                  }}
                />
                <span className="text-xs font-semibold text-ink-soft">{b.m}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-6 py-[22px]">
          <CardHead title="Répartition par service" className="mb-4" />
          <div className="space-y-4">
            {REPARTITION.map((r) => (
              <div key={r.label}>
                <div className="mb-1.5 flex justify-between text-[13px] text-ink">
                  <span>{r.label}</span>
                  <span className="font-bold">{r.pct} %</span>
                </div>
                <ProgressBar value={r.pct} color={r.color} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
