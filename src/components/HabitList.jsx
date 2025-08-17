import HabitItem from "./HabitItem.jsx";

export default function HabitList({ habits, weekDays, onToggle, onDelete }) {
  if (!habits.length) {
    return <p className="empty">No habits yet. Add your first habit above 👆</p>;
  }
  return (
    <div className="habit-list">
      {habits.map((h) => (
        <HabitItem key={h.id} habit={h} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
