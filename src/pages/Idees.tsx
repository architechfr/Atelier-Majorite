import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Card } from "../components/ui";
import { IDEES } from "../lib/cockpit";

export default function Idees() {
  // Votes locaux de l'élu connecté (prototype)
  const [votes, setVotes] = useState<Record<number, boolean>>({});

  return (
    <div className="flex max-w-[780px] flex-col gap-3.5">
      {IDEES.map((i, idx) => {
        const voted = votes[idx];
        const total = i.total + (voted ? 1 : 0);
        const pour = i.f + (voted ? 1 : 0);
        const pct = Math.round((pour / (total || 1)) * 100);
        return (
          <Card key={i.t} className="flex items-center gap-[18px] p-5">
            <div className="flex w-16 shrink-0 flex-col items-center gap-1">
              <button
                onClick={() =>
                  setVotes((v) => ({ ...v, [idx]: !v[idx] }))
                }
                aria-pressed={voted}
                className={`grid h-10 w-10 place-items-center rounded-xl border transition ${
                  voted
                    ? "border-royal-500 bg-royal-500 text-white"
                    : "border-royal-100 bg-royal-50 text-royal-500 hover:border-royal-300"
                }`}
              >
                <ArrowUp size={18} />
              </button>
              <span className="font-display text-base font-bold text-ink">
                {total}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-display text-[15.5px] font-semibold text-ink">
                  {i.t}
                </span>
                <span
                  className="rounded-full bg-panel-2 px-2.5 py-0.5 text-[11px] font-bold"
                  style={{ color: i.sc }}
                >
                  {i.status}
                </span>
              </div>
              <div className="mt-1.5 text-[12.5px] text-ink-soft">
                Proposé par {i.who} · {i.deleg}
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#FCEAE7]">
                  <div
                    className="h-full bg-success"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-success">{pour} pour</span>
                <span className="text-xs font-bold text-danger">{i.a} contre</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
