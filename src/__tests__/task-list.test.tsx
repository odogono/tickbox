import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import { TaskList } from "@/components/tasks/task-list";
import type { Task } from "@/lib/types";

const tasks: Task[] = [
  { id: "t1", listId: "l1", title: "Buy milk", priority: "normal", status: "open", updatedAt: "2026-10-04T10:00:00Z" },
  { id: "t2", listId: "l1", title: "Return library books", priority: "high", status: "overdue", updatedAt: "2026-10-04T10:00:00Z" },
];

describe("TaskList", () => {
  test("renders one row per task with its status", () => {
    render(<TaskList tasks={tasks} />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Return library books")).toBeInTheDocument();
    expect(screen.getAllByText("Overdue")).toHaveLength(1);
    expect(screen.getAllByText("Open")).toHaveLength(1);
  });

  test("shows an empty state when there are no tasks", () => {
    render(<TaskList tasks={[]} />);
    expect(screen.getByText(/nothing on this list yet/i)).toBeInTheDocument();
  });
});
