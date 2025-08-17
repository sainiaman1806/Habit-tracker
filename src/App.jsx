import { useEffect } from "react";
import HabitForm from "./components/habitform.jsx";
import HabitList from "./components/habitlist.jsx";
import WeekHeader from "./components/weekheader.jsx";
import { useLocalStorage } from "./hooks/uselocalstorage.js";
import { weekStartKey, getWeekDays } from "./utils/date.js";

export default function App() {
  const [habits, setHabits] = useLocalStorage("habits", []);
  const currentWeekKey = weekStartKey(new Date());
  const weekDays = getWeekDays(new Date()); // Monday → Sunday dates

  
  useEffect(() => {
    setHabits((prev) => {
      let changed = false;
      const updated = prev.map((h) => {
        if (h.weekStart !== currentWeekKey) {
          changed = true;
          return { ...h, weekStart: currentWeekKey, checks: Array(7).fill(false) };
        }
        return h;
      });
      return changed ? updated : prev;
    });
  }, [currentWeekKey, setHabits]);

  function addHabit(name) {
    const newHabit = {
      id: crypto.randomUUID(),
      name,
      weekStart: currentWeekKey,
      checks: Array(7).fill(false), // 7 days
      createdAt: Date.now(),
    };
    setHabits((h) => [newHabit, ...h]);
  }

  function deleteHabit(id) {
    setHabits((h) => h.filter((x) => x.id !== id));
  }

  function toggleCheck(id, dayIndex) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              checks: h.checks.map((v, i) => (i === dayIndex ? !v : v)),
            }
          : h
      )
    );
  }

  function clearAll() {
    if (confirm("Clear all habits for this week?")) {
      setHabits((prev) =>
        prev.map((h) => ({ ...h, checks: Array(7).fill(false) }))
      );
    }
  }

  return (
    <div className="container">
      <header className="topbar">
        <h1>Habit Tracker</h1>
        <button className="btn ghost" onClick={clearAll}>Clear Week</button>
      </header>

      <HabitForm onAdd={addHabit} />

      <WeekHeader weekDays={weekDays} />
      <HabitList
        habits={habits}
        weekDays={weekDays}
        onToggle={toggleCheck}
        onDelete={deleteHabit}
      />

      <footer className="footer">
        <p>
          Data is stored in your browser (localStorage). New week resets
          automatically (Mon → Sun).
        </p>
      </footer>
    </div>
  );
}
