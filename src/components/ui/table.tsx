import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

export function Table(props: HTMLAttributes<HTMLTableElement>) {
  return <table className="table" {...props} />;
}
export function TableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />;
}
export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}
export function TableRow(props: HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} />;
}
export function TableHead(props: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th {...props} />;
}
export function TableCell(props: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td {...props} />;
}
