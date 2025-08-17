export default function HabitItem({ habit, onToggle, onDelete }) {
  const done = habit.checks.filter(Boolean).length;
  const percent = Math.round((done / 7) * 100);

  return (
    <div className="habit-row">
      <div className="col name">{habit.name}</div>

      {habit.checks.map((checked, idx) => (
        <button
          key={idx}
          className={`col check ${checked ? "on" : ""}`}
          onClick={() => onToggle(habit.id, idx)}
          aria-label={`toggle day ${idx + 1}`}
        >
          {checked ? "✓" : ""}
        </button>
      ))}

      <div className="col progress">
        <div className="bar">
          <div className="fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="pct">{percent}%</span>
      </div>

      <div className="col actions">
        <button className="btn danger" onClick={() => onDelete(habit.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
