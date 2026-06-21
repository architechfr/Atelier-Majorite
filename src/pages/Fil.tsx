import { useEffect, useState } from "react";
import { Rss } from "lucide-react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/auth";
import { Avatar, Card } from "../components/ui";
import { ELUS } from "../lib/seed";

interface Publication {
  id: string;
  text: string;
  authorUid: string;
  authorName: string;
  createdAt: Timestamp | null;
}

function eluColor(name: string): string {
  const n = name.trim().toLowerCase();
  return (
    ELUS.find((e) => `${e.prenom} ${e.nom}`.toLowerCase() === n)?.couleur ??
    "#16324F"
  );
}

function ini(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

function dateLabel(ts: Timestamp | null): string {
  if (!ts) return "";
  return ts.toDate().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Fil() {
  const { session } = useAuth();
  const [posts, setPosts] = useState<Publication[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(
      collection(db, "publications"),
      orderBy("createdAt", "desc"),
    );
    return onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Publication)));
    });
  }, []);

  if (!db) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line px-6 py-14 text-center">
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-panel-2 text-ink-soft">
          <Rss size={26} />
        </div>
        <p className="font-semibold text-ink">Fil non disponible</p>
        <p className="mt-1.5 max-w-[340px] text-sm text-ink-muted">
          Firebase n'est pas configuré.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[680px] space-y-4">
      {/* Invite à publier */}
      <button
        className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-line bg-panel px-5 py-3.5 text-left text-[13.5px] text-ink-soft transition hover:border-royal-300 hover:bg-panel-2"
        onClick={() =>
          document.dispatchEvent(new CustomEvent("open-publish"))
        }
      >
        <Avatar
          ini={ini(session?.name ?? "?")}
          couleur={eluColor(session?.name ?? "")}
          size={36}
        />
        <span>Quoi de neuf ? Partagez avec la majorité…</span>
      </button>

      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line px-6 py-14 text-center">
          <div className="mb-3 text-ink-soft">
            <Rss size={28} />
          </div>
          <p className="font-semibold text-ink">Aucune publication pour l'instant</p>
          <p className="mt-1 text-sm text-ink-muted">
            Cliquez sur <strong>+ Publier</strong> en haut à droite pour commencer.
          </p>
        </div>
      )}

      {posts.map((p) => {
        const label = dateLabel(p.createdAt);
        return (
          <Card key={p.id} className="p-5">
            <div className="flex items-start gap-3">
              <Avatar
                ini={ini(p.authorName)}
                couleur={eluColor(p.authorName)}
                size={38}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[13.5px] font-bold text-ink">
                    {p.authorName}
                  </span>
                  {label && (
                    <span className="text-[11.5px] capitalize text-ink-soft">
                      {label}
                    </span>
                  )}
                </div>
                <p className="mt-2 whitespace-pre-wrap text-[13.5px] leading-relaxed text-ink">
                  {p.text}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
