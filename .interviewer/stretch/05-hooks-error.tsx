// Bug report: "Console says 'Rendered more hooks than during the previous
// render' and the page goes blank, but only when a list is empty."

import { useState } from "react";
import type { Task } from "@/lib/types";

export function TaskFilter({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return <p className="muted">Nothing on this list yet.</p>;
  }

  const [showDone, setShowDone] = useState(false);
  const visible = showDone ? tasks : tasks.filter((t) => t.status !== "done");

  return (
    <>
      <label>
        <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
        Show completed
      </label>
      <ul>
        {visible.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </>
  );
}
