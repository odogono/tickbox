// Bug report: "Ticking a task off does nothing. If I navigate away and back,
// it's ticked."

import { useState } from "react";
import type { Task } from "@/lib/types";

export function TaskChecklist({ initial }: { initial: Task[] }) {
  const [tasks, setTasks] = useState(initial);

  function toggle(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    task.status = task.status === "done" ? "open" : "done";
    setTasks(tasks);
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input type="checkbox" checked={task.status === "done"} onChange={() => toggle(task.id)} />
            {task.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
