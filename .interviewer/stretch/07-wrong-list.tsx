// Bug report: "If I click Groceries and then quickly click Work, I sometimes
// end up looking at the Groceries tasks under the Work heading."

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Task } from "@/lib/types";

export function ListTasks({ listId, listName }: { listId: string; listName: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.tasks.listByList(listId).then(setTasks);
  }, [listId]);

  return (
    <section>
      <h2>{listName}</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </section>
  );
}
