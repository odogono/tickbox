import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { CacheKeys } from "@/lib/cache-keys";
import type { Task } from "@/lib/types";

export function SnoozeButton({ task }: { task: Task }) {
  const queryClient = useQueryClient();
  const snooze = useMutation({
    mutationFn: () => api.tasks.snooze(task.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CacheKeys.tasks.byList(task.listId) }),
  });

  if (task.status !== "overdue") return null;

  // TODO: ticket says snoozed tasks should come back after an hour. The
  // server only sets the snoozed flag for now; expiry is not implemented.

  return (
    <Button size="sm" variant="outline" onClick={() => snooze.mutate()} disabled={snooze.isPending}>
      {snooze.isPending ? "Snoozing…" : "Snooze"}
    </Button>
  );
}
