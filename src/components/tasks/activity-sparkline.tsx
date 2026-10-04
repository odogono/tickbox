import { useMemo } from "react";
import { Bar, BarChart } from "recharts";
import { useTaskActivity } from "@/hooks/use-task-activity";
import type { ActivityEvent } from "@/lib/types";

const DAY = 24 * 60 * 60 * 1000;

export function ActivitySparkline({ taskId }: { taskId: string }) {
  const activity = useTaskActivity(taskId);

  if (activity.isPending) {
    return <span className="muted sparkline-placeholder">…</span>;
  }

  return <SparklineChart events={activity.data ?? []} />;
}

export function SparklineChart({ events }: { events: ActivityEvent[] }) {
  const buckets = useMemo(() => {
    const start = Date.now() - 7 * DAY;
    const days = Array.from({ length: 7 }, (_, day) => ({ day, count: 0 }));
    for (const event of events) {
      const day = Math.min(6, Math.max(0, Math.floor((Date.parse(event.at) - start) / DAY)));
      days[day]!.count += 1;
    }
    return days;
  }, [events]);

  if (events.length === 0) {
    return <span className="muted sparkline-placeholder">No activity in last 7 days</span>;
  }

  return (
    <BarChart width={120} height={28} data={buckets} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
      <Bar dataKey="count" fill="#1a73e8" isAnimationActive={false} />
    </BarChart>
  );
}
