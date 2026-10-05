import type { TaskStatus } from "@/lib/types";

const LABELS: Record<TaskStatus, string> = {
  open: "Open",
  overdue: "Overdue",
  snoozed: "Snoozed",
  done: "Done",
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`badge badge-${status}`} data-status={status}>
      {LABELS[status]}
    </span>
  );
}
