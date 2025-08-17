import { useState } from "react";

export default function HabitForm({ onAdd }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    onAdd(n);
    setName("");
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a habit (e.g., Drink Water)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn">Add</button>
    </form>
  );
}
