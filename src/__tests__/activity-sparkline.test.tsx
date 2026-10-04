import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import { SparklineChart } from "@/components/tasks/activity-sparkline";

describe("SparklineChart", () => {
  test("shows an empty state when there is no activity", () => {
    render(<SparklineChart events={[]} />);
    expect(screen.getByText(/no activity in last 7 days/i)).toBeInTheDocument();
  });
});
