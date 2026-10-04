import { createRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskList } from "@/components/tasks/task-list";
import { useTasks } from "@/hooks/use-tasks";
import { rootRoute } from "@/routes/__root";

export const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lists/$listId",
  component: ListPage,
});

function ListPage() {
  const { listId } = listRoute.useParams();
  const tasks = useTasks(listId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.isPending && <p className="muted">Loading tasks…</p>}
        {tasks.isError && (
          <p role="alert" className="error">
            Could not load tasks. {tasks.error.message}
          </p>
        )}
        {tasks.isSuccess && <TaskList tasks={tasks.data} />}
      </CardContent>
    </Card>
  );
}
