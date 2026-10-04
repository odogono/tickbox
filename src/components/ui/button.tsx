import type { ButtonHTMLAttributes } from "react";

type Variant = "default" | "outline" | "ghost";
type Size = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = "default", size = "md", className = "", ...props }: ButtonProps) {
  return <button className={`btn btn-${variant} btn-${size} ${className}`.trim()} {...props} />;
}
