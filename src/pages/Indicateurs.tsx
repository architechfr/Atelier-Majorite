import { Card } from "../components/ui";
import { ELUS } from "../lib/seed";
import { CONSEILS } from "../lib/conseils";

export default function Indicateurs() {
  const nbDelibs = CONSEILS.reduce((sum, c) => sum + c.delibs.length, 0);

  const kpis = [
    {
      label: "Population",
      value: "3 927–3 932",
      delta: "habitants · code INSEE 77192",
      tone: "#2F6BFF",
    },
    {
      label: "Élus de la majorité",
      value: String(ELUS.length),
      delta: "dont 9 maires-adjoints",
      tone: "#1E8E5A",
    },
    {
      label: "Conseils municipaux 2026",
      value: String(CONSEILS.length),
      delta: "séances tenues",
      tone: "#BE8E3C",
    },
    {
      label: "Délibérations votées 2026",
      value: String(nbDelibs),
      delta: "depuis le début de mandature",
      tone: "#14304C",
    },
  ];

  return (
    <div className="space-y-[18px]">
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {kpis.map((k) => (
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

      <Card className="p-[22px]">
        <p className="text-[13px] text-ink-muted">
          D'autres indicateurs (budget, présence aux séances, demandes
          citoyens…) seront ajoutés au fil des données disponibles.
        </p>
      </Card>
    </div>
  );
}
