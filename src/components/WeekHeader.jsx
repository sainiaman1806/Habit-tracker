import { dayShort } from "../utils/date.js";

export default function WeekHeader({ weekDays }) {
  return (
    <div className="week-header">
      <div className="col head">Habit</div>
      {weekDays.map((d) => (
        <div className="col day" key={d.toISOString()}>
          <div className="day-name">{dayShort(d)}</div>
          <div className="day-num">{d.getDate()}</div>
        </div>
      ))}
      <div className="col head">Progress</div>
      <div className="col head">Actions</div>
    </div>
  );
}
