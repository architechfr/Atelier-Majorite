import { Rss } from "lucide-react";

export default function Fil() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line px-6 py-14 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-panel-2 text-ink-soft">
        <Rss size={26} />
      </div>
      <span className="mb-3 rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-[11px] font-bold tracking-wide text-accent">
        BIENTÔT DISPONIBLE
      </span>
      <p className="font-semibold text-ink">Fil de la majorité</p>
      <p className="mt-1.5 max-w-[340px] text-sm text-ink-muted">
        Partagez actualités, photos et communications avec toute l'équipe.
        La publication sera ouverte dès la prochaine mise à jour.
      </p>
    </div>
  );
}
