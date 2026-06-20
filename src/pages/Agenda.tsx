import { Card } from "../components/ui";
import { AGENDA } from "../lib/cockpit";

export default function Agenda() {
  return (
    <div className="flex max-w-[760px] flex-col gap-3.5">
      {AGENDA.map((a) => (
        <Card
          key={`${a.d}-${a.t}`}
          className="flex items-center gap-4 px-5 py-4"
          style={a.hot ? { boxShadow: `inset 3px 0 0 ${a.sc}` } : undefined}
        >
          <div className="w-[62px] shrink-0 text-center">
            <div
              className="font-display text-[26px] font-bold leading-none"
              style={{ color: a.sc }}
            >
              {a.d}
            </div>
            <div className="mt-1 text-[11px] font-bold tracking-wider text-ink-soft">
              {a.m}
            </div>
          </div>
          <div className="w-px self-stretch bg-line-soft" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-display text-base font-semibold text-ink">
                {a.t}
              </span>
              <span
                className="rounded-full bg-panel-2 px-2.5 py-0.5 text-[11px] font-bold"
                style={{ color: a.sc }}
              >
                {a.k}
              </span>
            </div>
            <div className="mt-1 text-[13px] text-ink-muted">{a.s}</div>
          </div>
          <button className="shrink-0 rounded-[10px] border border-line bg-panel-2 px-3.5 py-2 text-[13px] font-semibold text-ink transition hover:border-marine-200">
            Participer
          </button>
        </Card>
      ))}
    </div>
  );
}
