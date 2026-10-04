// Bug report: "Opening a list deletes every task on it."

import { Button } from "@/components/ui/button";
import type { Task } from "@/lib/types";

interface Props {
  tasks: Task[];
  onDelete: (taskId: string) => void;
}

export function TaskRows({ tasks, onDelete }: Props) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}
          <Button size="sm" variant="outline" onClick={onDelete(task.id)}>
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
}
