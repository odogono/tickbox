import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CacheKeys } from "@/lib/cache-keys";
import { useAuth } from "./use-auth";

/**
 * Tasks in a list. Gated on authentication so we never fire requests
 * for a signed-out user, and keyed under `CacheKeys` so shared
 * invalidation reaches it.
 */
export function useTasks(listId: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: CacheKeys.tasks.byList(listId),
    queryFn: () => api.tasks.listByList(listId),
    enabled: isAuthenticated && listId.length > 0,
    staleTime: 30_000,
  });
}
