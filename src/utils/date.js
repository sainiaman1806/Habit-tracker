// Monday as start of week
export function startOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun..6=Sat
  const diff = (day === 0 ? -6 : 1 - day); // shift to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function weekStartKey(date = new Date()) {
  return startOfWeek(date).toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

export function getWeekDays(date = new Date()) {
  const start = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export function dayShort(date) {
  return date.toLocaleDateString(undefined, { weekday: "short" }); // Mon, Tue...
}
