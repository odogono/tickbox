// Bug report: "I typed a note on 'Buy milk', deleted the task above it, and
// my note jumped to a different task."

import { Button } from "@/components/ui/button";
import type { Task } from "@/lib/types";

interface Props {
  tasks: Task[];
  onDelete: (taskId: string) => void;
}

export function TaskNotes({ tasks, onDelete }: Props) {
  return (
    <table>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>{task.title}</td>
            <td>
              <input type="text" placeholder="Add a note…" />
            </td>
            <td>
              <Button size="sm" variant="outline" onClick={() => onDelete(task.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
