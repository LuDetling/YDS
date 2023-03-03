import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";

export default function CalendarComponent() {
  const navigate = useNavigate();
  const goToAgenda = (date) => {
    const day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear();

    console.log(day, month, year);
    navigate(`/agenda/${day}-${month}-${year}`);
  };
  return (
    <div>
      <section className="agenda-content">
        <Calendar
          className="calendar-content"
          onClickDay={(value) => goToAgenda(value)}
        />
      </section>
    </div>
  );
}
