import { useState } from "react";
import { Send, ChevronLeft } from "lucide-react";
import { Card } from "../components/ui";
import { CONVOS, THREAD, THREAD_TITRE } from "../lib/cockpit";

export default function Messages() {
  const [active, setActive] = useState(CONVOS[0].id);
  const [openOnMobile, setOpenOnMobile] = useState(false);

  return (
    <Card className="grid h-[560px] grid-cols-1 overflow-hidden p-0 md:grid-cols-[300px_1fr]">
      {/* Liste des conversations */}
      <div
        className={`overflow-y-auto border-line-soft md:border-r ${
          openOnMobile ? "hidden md:block" : "block"
        }`}
      >
        {CONVOS.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActive(c.id);
              setOpenOnMobile(true);
            }}
            className={`flex w-full items-center gap-3 border-b border-line-soft px-[18px] py-[15px] text-left transition hover:bg-panel-2 ${
              active === c.id ? "bg-panel-2" : ""
            }`}
          >
            <span
              className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[13px] text-[13px] font-bold text-white"
              style={{ background: c.c }}
            >
              {c.ini}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[13.5px] font-semibold text-ink">{c.n}</span>
                <span className="text-[11px] text-ink-soft">{c.time}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="truncate text-[12.5px] text-ink-soft">{c.last}</span>
                {c.unread > 0 && (
                  <span className="ml-auto grid h-[18px] min-w-[18px] place-items-center rounded-full bg-royal-500 px-1 text-[10px] font-bold text-white">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Conversation ouverte */}
      <div
        className={`flex-col bg-app ${openOnMobile ? "flex" : "hidden md:flex"}`}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-line-soft bg-panel px-[22px] py-[15px]">
          <button
            onClick={() => setOpenOnMobile(false)}
            className="rounded-lg p-1 text-ink-muted md:hidden"
            aria-label="Retour"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-marine-700 text-[12px] font-bold text-white">
            {THREAD_TITRE.ini}
          </span>
          <div>
            <div className="text-sm font-bold text-ink">{THREAD_TITRE.nom}</div>
            <div className="text-[11.5px] text-ink-soft">{THREAD_TITRE.membres}</div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-[22px]">
          {THREAD.map((m, i) =>
            m.me ? (
              <div key={i} className="max-w-[74%] self-end">
                <div className="rounded-[14px_4px_14px_14px] bg-marine-700 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={i} className="max-w-[74%] self-start">
                <div className="mb-1 ml-1 text-[11px] text-ink-soft">{m.name}</div>
                <div className="rounded-[4px_14px_14px_14px] border border-line bg-panel px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink">
                  {m.text}
                </div>
              </div>
            ),
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2.5 border-t border-line-soft bg-panel px-[18px] py-3.5">
          <div className="flex-1 rounded-[11px] border border-line bg-panel-2 px-3.5 py-2.5 text-[13.5px] text-ink-soft">
            Écrire un message…
          </div>
          <button
            className="grid h-[42px] w-[42px] place-items-center rounded-[11px] text-[var(--c-btn-ink)]"
            style={{ background: "var(--c-btn)" }}
            aria-label="Envoyer"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
}
