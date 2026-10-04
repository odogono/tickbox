/**
 * All query keys hang off `CacheKeys.all` so that a single
 * `queryClient.invalidateQueries({ queryKey: CacheKeys.all })` reaches
 * everything. Add new keys here, alphabetically, nested via spread.
 */
export const CacheKeys = {
  all: ["tickbox"] as const,
  lists: {
    all: () => [...CacheKeys.all, "lists"] as const,
  },
  tasks: {
    all: () => [...CacheKeys.all, "tasks"] as const,
    byList: (listId: string) => [...CacheKeys.tasks.all(), listId] as const,
  },
};
