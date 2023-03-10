import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

export default function CalendarComponent() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  const goToAgenda = (date) => {
    const day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear();
    navigate(`/agenda/${day}-${month}-${year}`);
  };
  return (
    <div>
      <Title>{user && <>bonjour {user.lastName} </>}nous sommes le {today}</Title>

      <section className="agenda-content">
        <Calendar
          className="calendar-content"
          onClickDay={(value) => goToAgenda(value)}
        />
      </section>
    </div>
  );
}

const Title = styled.h1`
text-align: center;
margin: 2rem 0;
  &::first-letter {
    text-transform: uppercase;
  }
`
