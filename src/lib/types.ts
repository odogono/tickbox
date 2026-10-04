export type TaskStatus = "open" | "overdue" | "snoozed" | "done";

export interface Task {
  id: string;
  listId: string;
  title: string;
  priority: "low" | "normal" | "high";
  status: TaskStatus;
  updatedAt: string;
}

export type ActivityKind = "edited" | "commented" | "completed" | "reopened";

export interface ActivityEvent {
  taskId: string;
  at: string;
  kind: ActivityKind;
}

export interface List {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  listIds: string[];
}
