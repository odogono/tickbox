import { describe, expect, test } from "bun:test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { TaskList } from "@/components/tasks/task-list";
import type { Task } from "@/lib/types";

const tasks: Task[] = [
  { id: "t1", listId: "l1", title: "Buy milk", priority: "normal", status: "open", updatedAt: "2026-10-04T10:00:00Z" },
  { id: "t2", listId: "l1", title: "Return library books", priority: "high", status: "overdue", updatedAt: "2026-10-04T10:00:00Z" },
];

function renderWithQuery(ui: ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe("TaskList", () => {
  test("renders one row per task with its status", () => {
    renderWithQuery(<TaskList tasks={tasks} />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Return library books")).toBeInTheDocument();
    expect(screen.getAllByText("Overdue")).toHaveLength(1);
    expect(screen.getAllByText("Open")).toHaveLength(1);
  });

  test("shows an empty state when there are no tasks", () => {
    renderWithQuery(<TaskList tasks={[]} />);
    expect(screen.getByText(/nothing on this list yet/i)).toBeInTheDocument();
  });
});
