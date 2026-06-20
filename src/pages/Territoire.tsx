import { useState } from "react";
import { Building2, Landmark, Calendar } from "lucide-react";
import { Card } from "../components/ui";
import {
  ECHELONS,
  ECHELON_PILE,
  CONTACTS,
  MATRIX,
  MATRIX_HEAD,
  FINANCEMENTS,
  FINANCEMENTS_STATS,
  type EchelonId,
} from "../lib/cockpit";

type Tab = "eco" | "contacts" | "qui" | "fin";

const TABS: { id: Tab; label: string }[] = [
  { id: "eco", label: "Écosystème" },
  { id: "contacts", label: "Contacts" },
  { id: "qui", label: "Qui fait quoi" },
  { id: "fin", label: "Financements" },
];

export default function Territoire() {
  const [tab, setTab] = useState<Tab>("eco");
  const [level, setLevel] = useState<EchelonId>("commune");

  return (
    <div>
      {/* Onglets */}
      <div className="mb-5 inline-flex flex-wrap gap-1 rounded-xl border border-line bg-panel p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap rounded-[9px] px-3.5 py-2 text-[13.5px] font-semibold transition ${
              tab === t.id
                ? "bg-marine-700 text-white"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "eco" && <Ecosysteme level={level} setLevel={setLevel} />}
      {tab === "contacts" && <Contacts />}
      {tab === "qui" && <QuiFaitQuoi />}
      {tab === "fin" && <Financements />}
    </div>
  );
}

/* ---------- Écosystème : échelons emboîtés + détail ---------- */

function Ecosysteme({
  level,
  setLevel,
}: {
  level: EchelonId;
  setLevel: (l: EchelonId) => void;
}) {
  const ld = ECHELONS[level];

  const ringStyle = (id: EchelonId) =>
    level === id
      ? {
          borderColor: ECHELONS[id].accent,
          boxShadow: `0 0 0 3px ${ECHELONS[id].accent}28`,
        }
      : { borderColor: "var(--c-line)" };

  // Construit l'emboîtement État > Région > Département > Interco > Commune.
  // Échelons emboîtés cliquables → div role="button" (boutons non imbricables).
  let node = (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setLevel("commune")}
      className="w-full cursor-pointer rounded-[13px] border-[1.5px] p-4 text-center text-white transition"
      style={{
        background: "linear-gradient(120deg,#16324F,#2F6BFF)",
        ...ringStyle("commune"),
      }}
    >
      <div className="text-[11px] font-bold tracking-[0.12em] text-royal-100">
        COMMUNE
      </div>
      <div className="font-display mt-0.5 text-[19px] font-bold">
        Ferrières-en-Brie
      </div>
      <div className="mt-0.5 text-xs text-royal-100/80">Vous êtes ici</div>
    </div>
  );

  const tints = ["#FBFCFE", "#F8FAFD", "#F5F8FC", "#F1F4F9"];
  // du plus interne (interco) au plus externe (état)
  [...ECHELON_PILE].reverse().forEach((e, idx) => {
    const inner = node;
    node = (
      <div
        role="button"
        tabIndex={0}
        onClick={(ev) => {
          ev.stopPropagation();
          setLevel(e.id);
        }}
        className="w-full cursor-pointer rounded-[15px] border-[1.5px] px-3.5 pb-4 pt-3.5 text-left transition"
        style={{ background: tints[idx], ...ringStyle(e.id) }}
      >
        <div className="mb-2.5 flex items-center gap-2 pl-0.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: e.dot }}
          />
          <span
            className="text-[11px] font-bold tracking-[0.1em]"
            style={{ color: e.dot }}
          >
            {e.label}
          </span>
          <span className="text-[11.5px] text-ink-soft">{e.sub}</span>
        </div>
        {inner}
      </div>
    );
  });

  return (
    <div className="grid items-start gap-[18px] lg:grid-cols-[1fr_348px]">
      <div>
        <p className="mb-3.5 text-[13px] leading-relaxed text-ink-muted">
          Ferrières-en-Brie au cœur de son territoire.{" "}
          <span className="font-semibold text-ink">Cliquez sur un échelon</span>{" "}
          pour comprendre ses compétences et le rôle de la commune.
        </p>
        {node}
        <div className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-dashed border-line px-3.5 py-2.5">
          <Landmark size={16} className="shrink-0 text-ink-soft" />
          <span className="text-[12.5px] text-ink-muted">
            Représentation nationale :{" "}
            <span className="font-semibold text-ink">Député</span> &{" "}
            <span className="font-semibold text-ink">Sénateurs</span> — voir
            l'onglet Contacts.
          </span>
        </div>
      </div>

      {/* Carte détail de l'échelon */}
      <Card className="px-[22px] py-[22px]">
        <div
          className="text-[11px] font-bold tracking-[0.12em]"
          style={{ color: ld.accent }}
        >
          {ld.tier}
        </div>
        <div className="font-display mt-1.5 text-xl font-bold leading-tight text-ink">
          {ld.name}
        </div>
        <div className="mt-1 text-[12.5px] text-ink-soft">{ld.sub}</div>

        <div className="mt-4 rounded-xl bg-panel-2 px-3.5 py-3">
          <div className="text-[10.5px] font-bold tracking-wide text-ink-soft">
            FERRIÈRES DANS CET ÉCHELON
          </div>
          <div className="mt-1.5 text-[13px] font-semibold text-ink">
            {ld.role}
          </div>
          <div className="mt-0.5 text-[12.5px] leading-snug text-ink-muted">
            {ld.roleDetail}
          </div>
        </div>

        <div className="mb-2.5 mt-[18px] text-[10.5px] font-bold tracking-wide text-ink-soft">
          COMPÉTENCES PRINCIPALES
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ld.comps.map((c) => (
            <span
              key={c}
              className="rounded-full border border-line bg-panel-2 px-2.5 py-1 text-[12px] font-medium text-ink-muted"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-[18px] flex items-center justify-between border-t border-line-soft pt-4">
          <div className="min-w-0">
            <div className="text-[11px] text-ink-soft">Interlocuteur clé</div>
            <div className="mt-0.5 text-[13px] font-semibold text-ink">
              {ld.contact}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div
              className="font-display text-[22px] font-bold leading-none"
              style={{ color: ld.accent }}
            >
              {ld.dossiers}
            </div>
            <div className="mt-0.5 text-[11px] text-ink-soft">dossiers liés</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---------- Contacts ---------- */

function Contacts() {
  return (
    <div className="grid gap-3.5 md:grid-cols-2">
      {CONTACTS.map((k) => (
        <Card
          key={k.role}
          className="p-[18px] transition hover:border-marine-200 hover:shadow-[var(--shadow-pop)]"
        >
          <div className="flex items-center gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] text-[13px] font-bold text-white"
              style={{ background: k.c }}
            >
              {k.ini}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-bold leading-tight text-ink">
                {k.role}
              </div>
              <div className="mt-0.5 text-[11.5px] font-semibold text-accent">
                {k.org}
              </div>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] leading-snug text-ink-muted">
            <span className="text-ink-soft">À contacter pour : </span>
            {k.for}
          </p>
          <div className="mt-3 flex items-center gap-2 border-t border-line-soft pt-3">
            <span className="text-[11.5px] text-ink-soft">Référent Ferrières</span>
            <span className="rounded-full border border-line bg-panel-2 px-2.5 py-0.5 text-[11.5px] font-semibold text-ink">
              {k.ref}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ---------- Qui fait quoi (matrice) ---------- */

function QuiFaitQuoi() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          <div className="grid grid-cols-[1.5fr_repeat(5,1fr)] gap-2 border-b border-line-soft bg-panel-2 px-[18px] py-3.5 text-[11px] font-bold tracking-wide text-ink-soft">
            <span>{MATRIX_HEAD[0]}</span>
            {MATRIX_HEAD.slice(1).map((h) => (
              <span key={h} className="text-center">
                {h}
              </span>
            ))}
          </div>
          {MATRIX.map((row) => (
            <div
              key={row.d}
              className="grid grid-cols-[1.5fr_repeat(5,1fr)] items-stretch gap-2 border-b border-line-soft px-[18px] py-2.5 last:border-0"
            >
              <span className="self-center text-[13px] font-semibold text-ink">
                {row.d}
              </span>
              {row.cells.map((cell, i) => (
                <span
                  key={i}
                  className="flex items-center justify-center rounded-lg px-1.5 py-2 text-center text-[10.5px] leading-tight"
                  style={{
                    background: cell.bg,
                    color: cell.col,
                    fontWeight: cell.strong ? 600 : 400,
                  }}
                >
                  {cell.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ---------- Financements ---------- */

function Financements() {
  return (
    <div>
      <div className="mb-4 grid max-w-[620px] grid-cols-1 gap-3.5 sm:grid-cols-3">
        {FINANCEMENTS_STATS.map((s) => (
          <Card key={s.label} className="px-4 py-4">
            <div
              className="font-display text-[23px] font-bold"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div className="mt-0.5 text-[12px] text-ink-muted">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="flex max-w-[820px] flex-col gap-3.5">
        {FINANCEMENTS.map((f) => (
          <Card key={f.name} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="font-display flex items-center gap-2 text-base font-bold text-ink">
                <Building2 size={17} className="text-ink-soft" />
                {f.name}
              </div>
              <span
                className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11.5px] font-bold text-white"
                style={{ background: f.c }}
              >
                {f.src}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
              {f.finance}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-3">
              <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-warn">
                <Calendar size={15} />
                {f.deadline}
              </span>
              <span className="text-[12px] text-ink-soft">
                Référent : <span className="font-semibold text-ink">{f.ref}</span>
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
