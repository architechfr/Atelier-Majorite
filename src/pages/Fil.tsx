import { useState } from "react";
import { ThumbsUp, MessageSquare, Pin } from "lucide-react";
import { Card, Avatar } from "../components/ui";
import { FIL, FIL_FILTRES } from "../lib/cockpit";

export default function Fil() {
  const [filtre, setFiltre] = useState("Tout");
  const posts = FIL.filter((p) => filtre === "Tout" || p.tag === filtre);

  return (
    <div>
      <div className="mb-[18px] flex flex-wrap gap-2">
        {FIL_FILTRES.map((f) => {
          const active = f === filtre;
          return (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                active
                  ? "bg-marine-700 text-white"
                  : "border border-line bg-panel font-medium text-ink-muted hover:border-marine-200"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="flex max-w-[780px] flex-col gap-3.5">
        {posts.map((p) => (
          <Card key={p.id} className="relative p-5">
            {p.epingle && (
              <span className="absolute right-[18px] top-4 flex items-center gap-1.5 text-[11px] font-bold text-warn">
                <Pin size={13} fill="currentColor" /> Épinglé
              </span>
            )}
            <div className="flex gap-3.5">
              <Avatar ini={p.ini} couleur={p.couleur} size={42} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[14.5px] font-bold text-ink">{p.nom}</span>
                  <span className="text-[12px] text-ink-soft">{p.role}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: p.tagBg, color: p.tagText }}
                  >
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-display mt-2 text-base font-semibold text-ink">
                  {p.titre}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {p.corps}
                </p>
                <div className="mt-3.5 flex gap-5 text-[13px] text-ink-soft">
                  <button className="flex items-center gap-1.5 transition hover:text-accent">
                    <ThumbsUp size={16} /> {p.likes}
                  </button>
                  <button className="flex items-center gap-1.5 transition hover:text-accent">
                    <MessageSquare size={16} /> {p.commentaires} commentaires
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
