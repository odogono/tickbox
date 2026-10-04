// Bug report: "The list page makes hundreds of requests a second and the
// laptop fan spins up."

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Task } from "@/lib/types";

export function OpenTasks({ listId }: { listId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const filter = { listId, includeDone: false };

  useEffect(() => {
    api.tasks.listByList(filter.listId).then((all) => {
      setTasks(filter.includeDone ? all : all.filter((t) => t.status !== "done"));
    });
  }, [filter]);

  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}
