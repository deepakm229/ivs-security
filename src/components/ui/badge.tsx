import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-amber-100 text-amber-800",
  QUOTED: "bg-purple-100 text-purple-800",
  WON: "bg-green-100 text-green-800",
  LOST: "bg-slate-100 text-slate-700",
};

export function Badge({
  className,
  status,
  children,
}: {
  className?: string;
  status?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        status ? statusStyles[status] : "bg-slate-100 text-slate-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
