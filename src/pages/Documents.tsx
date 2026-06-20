import { FileText } from "lucide-react";
import { Card } from "../components/ui";
import { DOCS } from "../lib/cockpit";

export default function Documents() {
  return (
    <Card className="max-w-[820px] overflow-hidden p-0">
      {DOCS.map((d) => (
        <div
          key={d.t}
          className="flex items-center gap-3.5 border-b border-line-soft px-[22px] py-[15px] last:border-0"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-panel-2 text-ink-muted">
            <FileText size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-ink">{d.t}</div>
            <div className="mt-0.5 text-[12px] text-ink-soft">
              {d.who} · {d.date}
            </div>
          </div>
          <span
            className="shrink-0 rounded-full bg-panel-2 px-2.5 py-1 text-[11.5px] font-bold"
            style={{ color: d.sc }}
          >
            {d.status}
          </span>
        </div>
      ))}
    </Card>
  );
}
