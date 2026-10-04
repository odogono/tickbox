import { useQuery } from "@tanstack/react-query";
import { createRoute, Link } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { CacheKeys } from "@/lib/cache-keys";
import { useAuth } from "@/hooks/use-auth";
import { rootRoute } from "@/routes/__root";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});

function IndexPage() {
  const { isAuthenticated } = useAuth();
  const lists = useQuery({
    queryKey: CacheKeys.lists.all(),
    queryFn: api.lists.list,
    enabled: isAuthenticated,
  });

  if (lists.isPending) return <p className="muted">Loading lists…</p>;
  if (lists.isError) return <p role="alert" className="error">Could not load lists.</p>;

  return (
    <ul>
      {lists.data.map((list) => (
        <li key={list.id}>
          <Link to="/lists/$listId" params={{ listId: list.id }}>
            {list.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
