import { ActivitySparkline } from "@/components/tasks/activity-sparkline";
import { SnoozeButton } from "@/components/tasks/snooze-button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Task } from "@/lib/types";

export interface TaskListProps {
  tasks: Task[];
}

function formatUpdated(iso: string): string {
  const minutes = Math.round((Date.now() - Date.parse(iso)) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  return hours < 48 ? `${hours} h ago` : `${Math.round(hours / 24)} d ago`;
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="muted">Nothing on this list yet.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} data-task-id={task.id}>
            <TableCell>
              <div className="task-title-cell">
                <span>{task.title}</span>
                <ActivitySparkline taskId={task.id} />
              </div>
            </TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell className="muted">{formatUpdated(task.updatedAt)}</TableCell>
            <TableCell>
              <StatusBadge status={task.status} />
            </TableCell>
            <TableCell>
              <SnoozeButton task={task} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
