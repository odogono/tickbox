import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`card ${className}`.trim()} {...props} />;
}

export function CardHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="card-header" {...props} />;
}

export function CardTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className="card-title" {...props} />;
}

export function CardContent(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="card-content" {...props} />;
}
