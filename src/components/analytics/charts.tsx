/**
 * Shared, presentational chart building blocks for the Analytics section.
 * Plain HTML/CSS/SVG only — no charting library. Server-renderable (no
 * client state); hover affordances use native `<title>` tooltips.
 *
 * Color usage follows the dataviz skill: sequential magnitude = single hue
 * (brand-blue), two-segment "point vs. context" bars = one hue + neutral gray
 * (brand-platinum), and profit/loss polarity = reserved status colors
 * (good/critical) paired with an icon, never color alone.
 */

// ---------------------------------------------------------------------------
// BarList — horizontal magnitude bars, single hue, direct-labeled
// ---------------------------------------------------------------------------

export type BarListRow = {
  label: string;
  value: number;
  valueLabel: string;
  sublabel?: string;
};

export function BarList({ rows, max }: { rows: BarListRow[]; max?: number }) {
  const maxValue = max ?? Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
            <span className="truncate text-brand-navy">
              {row.label}
              {row.sublabel && <span className="ml-1.5 text-status-neutral">{row.sublabel}</span>}
            </span>
            <span className="shrink-0 tabular-nums text-status-neutral">{row.valueLabel}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full bg-brand-blue"
              style={{ width: `${Math.min((row.value / maxValue) * 100, 100)}%` }}
              title={`${row.label}: ${row.valueLabel}`}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// ColumnChart — vertical bars for a short time series, single hue
// ---------------------------------------------------------------------------

export type ColumnRow = { label: string; value: number; valueLabel: string };

export function ColumnChart({ rows, max }: { rows: ColumnRow[]; max?: number }) {
  const maxValue = max ?? Math.max(...rows.map((r) => r.value), 1);
  return (
    <div>
      <div className="flex h-36 items-end gap-3 border-b border-border">
        {rows.map((row) => {
          const pct = Math.max((row.value / maxValue) * 100, 3);
          return (
            <div key={row.label} className="flex h-full flex-1 flex-col items-center justify-end">
              <span className="mb-1 text-[11px] font-medium tabular-nums text-brand-navy">
                {row.valueLabel}
              </span>
              <div
                className="w-6 rounded-t-[4px] bg-brand-blue sm:w-8"
                style={{ height: `${pct}%` }}
                title={`${row.label}: ${row.valueLabel}`}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-3">
        {rows.map((row) => (
          <div key={row.label} className="flex-1 text-center text-[11px] text-status-neutral">
            {row.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// StackedBarRow — two-segment bars (accent hue + neutral gray), with legend
// ---------------------------------------------------------------------------

export type StackedRow = { label: string; a: number; b: number; sublabel?: string };

export function StackedBarRow({
  rows,
  aLabel,
  bLabel,
  unit = "h",
}: {
  rows: StackedRow[];
  aLabel: string;
  bLabel: string;
  unit?: string;
}) {
  const max = Math.max(...rows.map((r) => r.a + r.b), 1);
  return (
    <div>
      <div className="mb-4 flex items-center gap-4 text-xs text-status-neutral">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-blue" aria-hidden />
          {aLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-border bg-brand-platinum" aria-hidden />
          {bLabel}
        </span>
      </div>
      <ul className="space-y-3">
        {rows.map((row) => {
          const total = row.a + row.b;
          const aPct = (row.a / max) * 100;
          const bPct = (row.b / max) * 100;
          return (
            <li key={row.label}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-xs">
                <span className="text-brand-navy">
                  {row.label}
                  {row.sublabel && <span className="ml-1.5 text-status-neutral">{row.sublabel}</span>}
                </span>
                <span className="tabular-nums text-status-neutral">
                  {row.a}
                  {unit} billable · {row.b}
                  {unit} non-billable · {total}
                  {unit} total
                </span>
              </div>
              <div className="flex h-2.5 w-full gap-[2px]">
                <div
                  className="h-full rounded-full bg-brand-blue"
                  style={{ width: `${aPct}%` }}
                  title={`Billable: ${row.a}${unit}`}
                />
                <div
                  className="h-full rounded-full bg-brand-platinum"
                  style={{ width: `${bPct}%` }}
                  title={`Non-billable: ${row.b}${unit}`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SvgLineChart — single-series trend line with end value + point tooltips
// ---------------------------------------------------------------------------

export type LinePoint = { label: string; value: number };

export function SvgLineChart({
  points,
  valueSuffix = "",
}: {
  points: LinePoint[];
  valueSuffix?: string;
}) {
  const width = 560;
  const height = 150;
  const paddingX = 20;
  const paddingTop = 24;
  const paddingBottom = 22;

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = points.length > 1 ? (width - paddingX * 2) / (points.length - 1) : 0;
  const plotHeight = height - paddingTop - paddingBottom;

  const coords = points.map((p, i) => ({
    ...p,
    x: paddingX + i * stepX,
    y: paddingTop + plotHeight - ((p.value - min) / range) * plotHeight,
  }));

  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
  const last = coords[coords.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label={`Trend line across ${points.length} periods, ending at ${last.value}${valueSuffix}`}
    >
      <line
        x1={paddingX}
        y1={height - paddingBottom}
        x2={width - paddingX}
        y2={height - paddingBottom}
        className="stroke-border"
        strokeWidth={1}
      />
      <path d={path} fill="none" className="stroke-brand-blue" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {coords.map((c) => (
        <circle key={c.label} cx={c.x} cy={c.y} r={4} className="fill-brand-blue stroke-surface" strokeWidth={2}>
          <title>{`${c.label}: ${c.value}${valueSuffix}`}</title>
        </circle>
      ))}
      {coords.map((c) => (
        <text
          key={`${c.label}-x`}
          x={c.x}
          y={height - 6}
          textAnchor="middle"
          className="fill-status-neutral"
          fontSize={10}
        >
          {c.label}
        </text>
      ))}
      <text x={last.x} y={last.y - 10} textAnchor="middle" className="fill-brand-navy font-medium" fontSize={11}>
        {last.value}
        {valueSuffix}
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// DivergingBarList — profit/loss around a zero baseline, status colors
// ---------------------------------------------------------------------------

export type ProfitabilityRow = { label: string; marginPct: number };

export function DivergingBarList({ rows }: { rows: ProfitabilityRow[] }) {
  const maxAbs = Math.max(...rows.map((r) => Math.abs(r.marginPct)), 1);
  return (
    <ul className="space-y-3">
      {rows.map((row) => {
        const isPositive = row.marginPct >= 0;
        const pct = (Math.abs(row.marginPct) / maxAbs) * 50;
        return (
          <li key={row.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-brand-navy">{row.label}</span>
              <span
                className={`flex items-center gap-1 font-medium tabular-nums ${
                  isPositive ? "text-status-good" : "text-status-critical"
                }`}
              >
                <span aria-hidden className="text-[10px]">
                  {isPositive ? "●" : "■"}
                </span>
                {isPositive ? "+" : ""}
                {row.marginPct}%
              </span>
            </div>
            <div className="relative h-2.5 w-full rounded-full bg-surface-muted">
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" aria-hidden />
              {isPositive ? (
                <div
                  className="absolute inset-y-0 left-1/2 rounded-r-full bg-status-good"
                  style={{ width: `${pct}%` }}
                  title={`${row.label}: +${row.marginPct}% margin`}
                />
              ) : (
                <div
                  className="absolute inset-y-0 right-1/2 rounded-l-full bg-status-critical"
                  style={{ width: `${pct}%` }}
                  title={`${row.label}: ${row.marginPct}% margin`}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
