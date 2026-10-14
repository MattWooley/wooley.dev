const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** "2021-04" → "Apr 2021". The schema guarantees the YYYY-MM shape. */
export function formatYearMonth(ym: string): string {
  const year = Number(ym.slice(0, 4));
  const month = Number(ym.slice(5, 7));
  return monthYear.format(new Date(Date.UTC(year, month - 1, 1)));
}

/** "Apr 2025 – Present". */
export function formatSpan(span: Span): string {
  return `${formatYearMonth(span.start)} – ${span.end === null ? 'Present' : formatYearMonth(span.end)}`;
}

export interface Span {
  readonly start: string;
  readonly end: string | null;
}

const OPEN = '9999-12';

/** The whole time at a company, across all of its roles. */
export function tenure(roles: readonly Span[]): Span {
  const start = roles.reduce((min, r) => (r.start < min ? r.start : min), OPEN);
  if (roles.some((r) => r.end === null)) return { start, end: null };
  const end = roles.reduce((max, r) => (r.end !== null && r.end > max ? r.end : max), '0000-01');
  return { start, end };
}

/** Newest first; a current position sorts above everything that has ended. */
export function byMostRecent<T extends { data: { roles: readonly Span[] } }>(a: T, b: T): number {
  const ta = tenure(a.data.roles);
  const tb = tenure(b.data.roles);
  return (tb.end ?? OPEN).localeCompare(ta.end ?? OPEN) || tb.start.localeCompare(ta.start);
}
