import { ActivitySparkline } from "@/components/tasks/activity-sparkline";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Task } from "@/lib/types";

export interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="muted">Nothing on this list yet.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
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
            <TableCell>
              <StatusBadge status={task.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
