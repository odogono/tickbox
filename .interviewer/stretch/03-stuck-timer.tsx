// Bug report: "The 'saved N seconds ago' label gets to 1 and stops."

import { useEffect, useState } from "react";

export function SavedAgo({ savedAt }: { savedAt: number }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="muted">
      Saved {seconds}s ago ({new Date(savedAt).toLocaleTimeString()})
    </span>
  );
}
