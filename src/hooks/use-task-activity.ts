import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const WEEK = 7 * 24 * 60 * 60 * 1000;
// Start of the 7-day window, computed once when the module loads.
const since = new Date(Date.now() - WEEK).toISOString();

/** Last 7 days of activity for a task. */
export function useTaskActivity(taskId: string) {
  return useQuery({
    queryKey: ["activity", taskId],
    queryFn: () => api.activity.listByTask(taskId, since),
    staleTime: 60_000,
  });
}
