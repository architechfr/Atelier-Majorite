import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Card, Toggle, Field, Input, Button } from "../components/ui";
import { useAuth } from "../lib/auth";
import { useSettings, type Scale } from "../lib/settings";
import { ELUS } from "../lib/seed";
import { getProfil, saveProfil, type Profil } from "../lib/profil";

const SCALES: { id: Scale; label: string }[] = [
  { id: "standard", label: "Standard" },
  { id: "grand", label: "Grand" },
  { id: "xl", label: "Très grand" },
];

export default function Reglages() {
  const navigate = useNavigate();
  const { session, logout, updateDisplayName } = useAuth();
  const { settings, setTheme, setScale, toggle, toggleNotif } = useSettings();

  // --- Mon profil ---
  const [displayName, setDisplayName] = useState(
    session?.name?.includes("@") ? "" : (session?.name ?? ""),
  );
  const [tel, setTel] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Charge le profil Firestore au montage
  useEffect(() => {
    if (!session?.uid) return;
    getProfil(session.uid).then((p) => {
      if (!p) return;
      if (p.displayName) setDisplayName(p.displayName);
      if (p.tel) setTel(p.tel);
      if (p.emailContact) setEmailContact(p.emailContact);
    });
  }, [session?.uid]);

  // Élu correspondant au nom saisi
  const matchedElu = ELUS.find(
    (e) =>
      `${e.prenom} ${e.nom}`.toLowerCase() === displayName.trim().toLowerCase(),
  );

  const handleSaveProfil = async () => {
    if (!session?.uid || !displayName.trim()) return;
    setSaving(true);
    const profil: Profil = {
      displayName: displayName.trim(),
      eluId: matchedElu?.id,
      tel: tel.trim() || undefined,
      emailContact: emailContact.trim() || undefined,
    };
    await Promise.all([
      updateDisplayName(displayName.trim()),
      saveProfil(session.uid, profil),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Affichage sidebar (ini + rôle)
  const name = session?.name ?? "Élu·e";
  const ini =
    name
      .trim()
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "AM";
  const role =
    matchedElu?.delegation ??
    ELUS.find(
      (e) => `${e.prenom} ${e.nom}`.toLowerCase() === name.toLowerCase(),
    )?.delegation ??
    "Conseiller·ère municipal·e";

  return (
    <div className="flex max-w-[840px] flex-col gap-[18px]">
      {/* Mon profil */}
      <Card className="px-6 py-[22px]">
        <div className="font-display mb-1 text-base font-bold text-ink">
          Mon profil
        </div>
        <p className="mb-5 text-[13px] text-ink-soft">
          Votre nom s'affichera dans l'application. Vos coordonnées sont visibles
          uniquement par les autres élus connectés.
        </p>

        <div className="space-y-4">
          <Field label="Nom complet">
            <Input
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                setSaved(false);
              }}
              placeholder="Prénom Nom (ex. Florian Clarisse)"
            />
          </Field>

          {matchedElu && (
            <div className="rounded-xl border border-[#C6EAD8] bg-[#E9F6F0] px-4 py-3">
              <div className="text-[12.5px] font-bold text-[#1E8E5A]">
                ✓ Fiche reconnue : {matchedElu.fonction}
              </div>
              {matchedElu.delegation && (
                <div className="mt-0.5 text-[12px] text-[#1E8E5A]/80">
                  {matchedElu.delegation}
                </div>
              )}
            </div>
          )}

          {displayName.trim() && !matchedElu && (
            <div className="rounded-xl border border-warn/30 bg-warn/10 px-4 py-2.5 text-[12.5px] text-warn">
              Nom non reconnu dans la liste des élus. Vérifiez l'orthographe
              exacte (ex. « Florian Clarisse »).
            </div>
          )}

          <Field label="Téléphone (visible par les élus connectés)">
            <Input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              placeholder="06 XX XX XX XX"
            />
          </Field>

          <Field label="Email de contact (si différent du compte de connexion)">
            <Input
              type="email"
              value={emailContact}
              onChange={(e) => setEmailContact(e.target.value)}
              placeholder="prenom.nom@…"
            />
          </Field>

          {saved && (
            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1E8E5A]">
              <CheckCircle2 size={16} />
              Profil enregistré
            </div>
          )}

          <Button
            variant="accent"
            onClick={handleSaveProfil}
            disabled={saving || !displayName.trim()}
            className="w-full sm:w-auto"
          >
            {saving ? "Enregistrement…" : "Enregistrer mon profil"}
          </Button>
        </div>
      </Card>

      {/* Ambiance */}
      <Card className="px-6 py-[22px]">
        <div className="font-display text-base font-bold text-ink">
          Ambiance de l'application
        </div>
        <p className="mb-[18px] mt-0.5 text-[13px] text-ink-soft">
          Choisissez l'apparence de l'Atelier. Chaque élu peut adapter la sienne.
        </p>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <ThemeCard
            selected={settings.theme === "clair"}
            onClick={() => setTheme("clair")}
            title="Clair"
            sub="Institutionnel"
            preview={
              <div
                className="relative h-[76px] overflow-hidden rounded-[10px]"
                style={{ background: "linear-gradient(120deg,#16324F,#2F6BFF)" }}
              >
                <div className="absolute left-2.5 top-2.5 h-[7px] w-[54px] rounded bg-white/55" />
                <div className="absolute inset-x-2.5 bottom-2.5 top-6 rounded-lg bg-[#F4F7FC]" />
              </div>
            }
          />
          <ThemeCard
            selected={settings.theme === "nocturne"}
            onClick={() => setTheme("nocturne")}
            title="Nocturne"
            sub="Futuriste"
            preview={
              <div className="relative h-[76px] overflow-hidden rounded-[10px] border border-[#1C2C42] bg-[#0A1422]">
                <div
                  className="absolute left-2.5 top-2.5 h-[7px] w-[54px] rounded"
                  style={{ background: "linear-gradient(90deg,#38E1D0,#4D8BFF)" }}
                />
                <div className="absolute inset-x-2.5 bottom-2.5 top-6 rounded-lg border border-[#1C2C42] bg-[#0E1B2C]" />
              </div>
            }
          />
        </div>
      </Card>

      {/* Accessibilité */}
      <Card className="px-6 py-[22px]">
        <div className="font-display text-base font-bold text-ink">
          Accessibilité
        </div>
        <p className="mb-[18px] text-[13px] text-ink-soft">
          Pensé pour des élus de tous âges.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft pb-[18px] pt-1.5">
          <div>
            <div className="text-sm font-semibold text-ink">Taille du texte</div>
            <div className="mt-0.5 text-[12.5px] text-ink-soft">
              Agrandit toute l'interface
            </div>
          </div>
          <div className="flex gap-1 rounded-[11px] border border-line bg-panel-2 p-1">
            {SCALES.map((s) => (
              <button
                key={s.id}
                onClick={() => setScale(s.id)}
                className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold transition ${
                  settings.scale === s.id
                    ? "bg-marine-700 text-white"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <Row
          title="Contraste élevé"
          sub="Renforce la lisibilité des textes"
          on={settings.highContrast}
          onToggle={() => toggle("highContrast")}
        />
        <Row
          title="Réduire les animations"
          sub="Limite les effets de mouvement"
          on={settings.reduceMotion}
          onToggle={() => toggle("reduceMotion")}
          last
        />
      </Card>

      {/* Notifications */}
      <Card className="px-6 py-[22px]">
        <div className="font-display mb-3.5 text-base font-bold text-ink">
          Notifications
        </div>
        <Row
          title="Conseils & délibérations"
          on={settings.notif.conseils}
          onToggle={() => toggleNotif("conseils")}
          compact
        />
        <Row
          title="Mentions & messages"
          on={settings.notif.mentions}
          onToggle={() => toggleNotif("mentions")}
          compact
        />
        <Row
          title="Nouvelles idées soumises"
          on={settings.notif.idees}
          onToggle={() => toggleNotif("idees")}
          compact
          last
        />
      </Card>

      {/* Compte */}
      <Card className="px-6 py-[22px]">
        <div className="font-display mb-4 text-base font-bold text-ink">
          Compte
        </div>
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-royal-500 text-base font-bold text-white">
            {ini}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-bold text-ink">{name}</div>
            <div className="text-[12.5px] text-ink-soft">
              {session?.email ?? ""}
            </div>
            <div className="mt-0.5 text-[12px] text-ink-soft">{role}</div>
          </div>
        </div>
        <div className="mt-[18px]">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="rounded-[10px] border border-passion-100 bg-panel px-4 py-2.5 text-[13px] font-semibold text-danger"
          >
            Se déconnecter
          </button>
        </div>
      </Card>
    </div>
  );
}

function ThemeCard({
  selected,
  onClick,
  title,
  sub,
  preview,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  sub: string;
  preview: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-[14px] border-2 p-3 text-left transition"
      style={{
        borderColor: selected ? "#2F6BFF" : "var(--c-line)",
        boxShadow: selected ? "0 0 0 3px rgba(47,107,255,.16)" : "none",
      }}
    >
      {preview}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">{title}</span>
        <span className="text-xs font-semibold text-accent">{sub}</span>
      </div>
    </button>
  );
}

function Row({
  title,
  sub,
  on,
  onToggle,
  last,
  compact,
}: {
  title: string;
  sub?: string;
  on: boolean;
  onToggle: () => void;
  last?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between ${
        compact ? "py-3" : "py-[18px]"
      } ${last ? "" : "border-b border-line-soft"}`}
    >
      <div>
        <div className={`font-${sub ? "semibold" : "medium"} text-sm text-ink`}>
          {title}
        </div>
        {sub && (
          <div className="mt-0.5 text-[12.5px] text-ink-soft">{sub}</div>
        )}
      </div>
      <Toggle on={on} onClick={onToggle} label={title} />
    </div>
  );
}
