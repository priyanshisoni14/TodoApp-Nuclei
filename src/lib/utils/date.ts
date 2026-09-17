export function formatDueDate(ms: number | null): string {
  if (!ms) return '';

  const startOf = (d: number | Date) => new Date(d).setHours(0, 0, 0, 0);
  const days = Math.round((startOf(ms) - startOf(Date.now())) / 86_400_000);

  if (days < -1) return `Overdue by ${Math.abs(days)} days`;
  if (days === -1) return 'Overdue by 1 day';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';

  return new Date(ms).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

// New helper — used to apply red styling
export function isOverdue(ms: number | null): boolean {
  if (!ms) return false;
  const startOf = (d: number | Date) => new Date(d).setHours(0, 0, 0, 0);
  return startOf(ms) < startOf(Date.now());
}