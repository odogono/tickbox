import type { ActivityEvent, ActivityKind, List, Task, User } from "../src/lib/types";

export const users: User[] = [
  { id: "u-ana", name: "Ana Okafor", listIds: ["list-groceries", "list-work"] },
  { id: "u-ben", name: "Ben Larsen", listIds: ["list-renovation"] },
];

export const lists: List[] = [
  { id: "list-groceries", name: "Groceries" },
  { id: "list-work", name: "Work" },
  { id: "list-renovation", name: "Home renovation" },
];

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3_600_000).toISOString();

export const tasks: Task[] = [
  { id: "task-g1", listId: "list-groceries", title: "Buy milk", priority: "normal", status: "open", updatedAt: hoursAgo(2) },
  { id: "task-g2", listId: "list-groceries", title: "Return library books", priority: "high", status: "overdue", updatedAt: hoursAgo(30) },
  { id: "task-g3", listId: "list-groceries", title: "Order cat food", priority: "low", status: "done", updatedAt: hoursAgo(50) },
  { id: "task-w1", listId: "list-work", title: "Send Q3 invoice", priority: "high", status: "open", updatedAt: hoursAgo(5) },
  { id: "task-r1", listId: "list-renovation", title: "Book electrician", priority: "high", status: "overdue", updatedAt: hoursAgo(70) },
];

const KINDS: ActivityKind[] = ["edited", "commented", "completed", "reopened"];

/** About two weeks of activity per task, oldest first. Deterministic so tests are stable. */
export const activity: ActivityEvent[] = tasks.flatMap((task, t) =>
  Array.from({ length: 30 }, (_, i) => {
    const hours = ((i * 53 + t * 17) % (14 * 24)) + 0.5;
    return { taskId: task.id, at: hoursAgo(hours), kind: KINDS[(i + t) % KINDS.length]! };
  }).sort((a, b) => a.at.localeCompare(b.at)),
);

export function findUser(id: string | null): User | undefined {
  return users.find((u) => u.id === id);
}

export function userCanAccessList(user: User, listId: string): boolean {
  return user.listIds.includes(listId);
}
