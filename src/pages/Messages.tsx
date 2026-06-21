import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/auth";
import { Avatar } from "../components/ui";
import { ELUS } from "../lib/seed";

interface ChatMessage {
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

function heure(ts: Timestamp | null): string {
  if (!ts) return "";
  return ts.toDate().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function jourLabel(ts: Timestamp | null): string {
  if (!ts) return "";
  return ts.toDate().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function Messages() {
  const { session } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    return onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChatMessage)),
      );
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!text.trim() || !db || !session) return;
    setSending(true);
    await addDoc(collection(db, "messages"), {
      text: text.trim(),
      authorUid: session.uid ?? "demo",
      authorName: session.name,
      createdAt: serverTimestamp(),
    });
    setText("");
    setSending(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!db) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line px-6 py-14 text-center">
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-panel-2 text-ink-soft">
          <Send size={26} />
        </div>
        <p className="font-semibold text-ink">Messagerie non disponible</p>
        <p className="mt-1.5 max-w-[340px] text-sm text-ink-muted">
          La messagerie nécessite Firebase. Vérifiez la configuration.
        </p>
      </div>
    );
  }

  // Groupe les messages par jour pour afficher un séparateur de date
  type DayGroup = { dayLabel: string; msgs: ChatMessage[] };
  const groups: DayGroup[] = [];
  for (const m of messages) {
    const label = jourLabel(m.createdAt);
    const last = groups[groups.length - 1];
    if (!last || last.dayLabel !== label) {
      groups.push({ dayLabel: label, msgs: [m] });
    } else {
      last.msgs.push(m);
    }
  }

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-[var(--shadow-card)]"
      style={{ height: "calc(100dvh - 160px)", minHeight: 420 }}
    >
      {/* En-tête */}
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
        <div
          className="h-2.5 w-2.5 rounded-full bg-[#1E8E5A]"
          aria-hidden
        />
        <span className="text-[13.5px] font-semibold text-ink">
          Fil commun — Majorité Ferrières-en-Brie
        </span>
        <span className="ml-auto text-[12px] text-ink-soft">
          {ELUS.length} élus
        </span>
      </div>

      {/* Liste des messages */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-muted">
            Aucun message pour l'instant — lancez la conversation !
          </p>
        )}

        {groups.map((g) => (
          <div key={g.dayLabel}>
            {g.dayLabel && (
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-line-soft" />
                <span className="text-[11px] font-semibold capitalize text-ink-soft">
                  {g.dayLabel}
                </span>
                <div className="h-px flex-1 bg-line-soft" />
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {g.msgs.map((m) => {
                const isMe = m.authorUid === session?.uid;
                return (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 ${isMe ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar
                      ini={ini(m.authorName)}
                      couleur={eluColor(m.authorName)}
                      size={30}
                    />
                    <div
                      className={`flex max-w-[72%] flex-col gap-0.5 ${
                        isMe ? "items-end" : "items-start"
                      }`}
                    >
                      <div className="flex items-baseline gap-1.5">
                        {!isMe && (
                          <span className="text-[11.5px] font-semibold text-ink-muted">
                            {m.authorName}
                          </span>
                        )}
                        <span className="text-[11px] text-ink-soft">
                          {heure(m.createdAt)}
                        </span>
                      </div>
                      <div
                        className={`rounded-2xl px-3.5 py-2 text-[13.5px] leading-snug ${
                          isMe
                            ? "rounded-tr-sm text-white"
                            : "rounded-tl-sm bg-panel-2 text-ink"
                        }`}
                        style={
                          isMe ? { background: "var(--c-accent)" } : undefined
                        }
                      >
                        {m.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Saisie */}
      <div className="border-t border-line px-4 py-3">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Écrire un message… (Entrée pour envoyer)"
            className="flex-1 rounded-xl border border-line bg-panel-2 px-3.5 py-2.5 text-[13.5px] text-ink outline-none placeholder:text-ink-soft focus:border-royal-400 focus:ring-2 focus:ring-royal-100"
          />
          <button
            onClick={send}
            disabled={!text.trim() || sending}
            aria-label="Envoyer"
            className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl text-white transition disabled:opacity-40"
            style={{ background: "var(--c-accent)" }}
          >
            <Send size={17} />
          </button>
        </div>
        <p className="mt-1.5 text-[11px] text-ink-soft">
          Maj+Entrée pour sauter une ligne
        </p>
      </div>
    </div>
  );
}
