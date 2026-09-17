/** Turns an epoch-ms due date into "Today" / "Tomorrow" / "Sat, Sep 13". */
export function formatDueDate(ms: number | null): string {
	if (!ms) return '';

	const startOf = (d: number | Date) => new Date(d).setHours(0, 0, 0, 0);
	const days = Math.round((startOf(ms) - startOf(Date.now())) / 86_400_000);

	if (days === 0) return 'Today';
	if (days === 1) return 'Tomorrow';

	return new Date(ms).toLocaleDateString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric'
	});
}