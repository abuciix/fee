import Link from "next/link";
import type { NavLeaf, NavSection } from "@/lib/navigation";
import { Card, PageHeader } from "@/components/ui";

export default function StubPage({
  item,
  icon,
}: {
  item: NavSection | NavLeaf;
  icon: string;
}) {
  const children = "children" in item ? item.children : undefined;

  return (
    <div>
      <PageHeader icon={icon} title={item.label} description={item.description} />

      <Card className="border-dashed">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🚧</span>
          <div>
            <div className="font-medium text-brand-navy">This module is on the roadmap</div>
            <p className="mt-1 text-sm text-status-neutral">
              {`${item.label} isn't built yet — here's what it's planned to cover.`}
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {item.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-0.5 text-brand-tan">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Card>

      {children && children.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Inside {item.label}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="rounded-lg border border-border bg-surface p-4 shadow-sm transition-colors hover:border-brand-tan"
              >
                <div className="font-medium text-brand-navy">{child.label}</div>
                <p className="mt-1 text-xs text-status-neutral">{child.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
