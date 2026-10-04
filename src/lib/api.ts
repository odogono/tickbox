import type { ActivityEvent, List, Task } from "./types";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `${init?.method ?? "GET"} ${path} failed with ${res.status}`);
  }
  return (await res.json()) as T;
}

export const api = {
  lists: {
    list: () => request<List[]>("/lists"),
  },
  tasks: {
    listByList: (listId: string) => request<Task[]>(`/lists/${listId}/tasks`),
    snooze: (taskId: string) => request<Task>(`/tasks/${taskId}/snooze`, { method: "POST" }),
  },
  activity: {
    listByTask: (taskId: string, since: string) =>
      request<ActivityEvent[]>(`/tasks/${taskId}/activity?since=${encodeURIComponent(since)}`),
  },
};
