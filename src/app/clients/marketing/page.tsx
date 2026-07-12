import { Card, PageHeader } from "@/components/ui";
import { PORTFOLIO } from "@/lib/client-data";

export const metadata = { title: "Marketing & Portfolio" };

export default function MarketingPortfolioPage() {
  return (
    <div>
      <PageHeader
        icon="🤝"
        title="Marketing & Portfolio"
        description="The studio's public-facing portfolio, awards, and publications."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {PORTFOLIO.map((item) => (
          <Card key={item.id}>
            <div className="mb-2 flex h-28 items-center justify-center rounded-md bg-brand-navy-light text-xs font-medium uppercase tracking-wide text-brand-platinum">
              {item.typology}
            </div>
            <div className="font-medium text-brand-navy">{item.projectName}</div>
            <div className="text-xs text-status-neutral">
              {item.client} · {item.location} · {item.year}
            </div>
            <p className="mt-2 text-sm text-status-neutral">{item.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand-tan/20 px-2 py-0.5 text-xs font-medium text-brand-navy"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
