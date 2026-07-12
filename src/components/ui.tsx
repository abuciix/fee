export function PageHeader({
  icon,
  title,
  description,
}: {
  icon?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="flex items-center gap-2 text-2xl font-semibold text-brand-navy">
        {icon && <span>{icon}</span>}
        {title}
      </h2>
      {description && <p className="mt-1 max-w-2xl text-sm text-status-neutral">{description}</p>}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-border bg-surface p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <div className="text-xs font-medium uppercase tracking-wide text-status-neutral">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-brand-navy">{value}</div>
      {hint && <div className="mt-1 text-xs text-status-neutral">{hint}</div>}
    </Card>
  );
}

type Status = "good" | "warning" | "critical" | "neutral";

const statusStyles: Record<Status, string> = {
  good: "text-status-good bg-status-good-bg",
  warning: "text-status-warning bg-status-warning-bg",
  critical: "text-status-critical bg-status-critical-bg",
  neutral: "text-status-neutral bg-status-neutral-bg",
};

const statusIcon: Record<Status, string> = {
  good: "●",
  warning: "▲",
  critical: "■",
  neutral: "○",
};

export function StatusPill({ status, label }: { status: Status; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span aria-hidden className="text-[10px]">
        {statusIcon[status]}
      </span>
      {label}
    </span>
  );
}
