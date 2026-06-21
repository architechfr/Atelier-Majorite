import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/auth";
import { Modal, Button, Textarea } from "./ui";

export function PublishModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { session } = useAuth();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  const publish = async () => {
    if (!text.trim() || !db || !session) return;
    setPosting(true);
    await addDoc(collection(db, "publications"), {
      text: text.trim(),
      authorUid: session.uid ?? "demo",
      authorName: session.name,
      createdAt: serverTimestamp(),
    });
    setText("");
    setPosting(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Nouvelle publication">
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Partagez une actualité, une décision, une info avec la majorité…"
          rows={5}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant="accent"
            onClick={publish}
            disabled={!text.trim() || posting}
          >
            {posting ? "Publication…" : "Publier"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
