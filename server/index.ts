import { activity, findUser, lists, snoozedTasks, tasks, userCanAccessList } from "./store";
import type { Task } from "../src/lib/types";

const PORT = Number(process.env.PORT ?? 4100);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

/**
 * Demo auth: the caller identifies themselves with `x-user-id`. In the real
 * product this is a session cookie; the authorisation rules are the same.
 */
function authenticate(req: Request) {
  return findUser(req.headers.get("x-user-id"));
}

Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/api/, "");
    const user = authenticate(req);
    if (!user) return json({ error: "unauthenticated" }, 401);

    if (req.method === "GET" && path === "/lists") {
      return json(lists.filter((l) => userCanAccessList(user, l.id)));
    }

    const listTasks = path.match(/^\/lists\/([^/]+)\/tasks$/);
    if (req.method === "GET" && listTasks) {
      const listId = listTasks[1]!;
      if (!userCanAccessList(user, listId)) return json({ error: "forbidden" }, 403);
      return json(tasks.filter((t) => t.listId === listId).map(withSnooze));
    }

    const taskActivity = path.match(/^\/tasks\/([^/]+)\/activity$/);
    if (req.method === "GET" && taskActivity) {
      const task = tasks.find((t) => t.id === taskActivity[1]);
      if (!task) return json({ error: "not found" }, 404);
      if (!userCanAccessList(user, task.listId)) return json({ error: "forbidden" }, 403);
      const since = url.searchParams.get("since");
      const sinceMs = since ? Date.parse(since) : 0;
      return json(activity.filter((a) => a.taskId === task.id && Date.parse(a.at) >= sinceMs));
    }

    const snooze = path.match(/^\/tasks\/([^/]+)\/snooze$/);
    if (req.method === "POST" && snooze) {
      const task = tasks.find((t) => t.id === snooze[1]);
      if (!task) return json({ error: "not found" }, 404);
      snoozedTasks.add(task.id);
      return json(withSnooze(task));
    }

    return json({ error: "not found" }, 404);
  },
});

function withSnooze(task: Task): Task {
  if (task.status === "overdue" && snoozedTasks.has(task.id)) {
    return { ...task, status: "snoozed" };
  }
  return task;
}

console.log(`Tickbox API listening on http://localhost:${PORT}`);
