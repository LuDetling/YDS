import data from "../backend/profil.json";
import styled from "styled-components";
import colors from "../styles/colors";
import Calendar from "react-calendar";

const ContentAgenda = styled.section`
  background-color: ${colors.primary};
  width: 60%;
  margin: 2rem auto;
  border-radius: 20px;
  padding: 20px;
`;

const today = () => {
  const date = new Date();
  const today = date.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return today;
};

export default function Agenda() {
  return (
    <div>
      <h2>
        Bonjour {data.firstName} {data.lastName} Nous sommes le {today()}
      </h2>
      <ContentAgenda>
        <Calendar className="calendar-content" onClickDay={() => console.log("coucou")}/>
      </ContentAgenda>
    </div>
  );
}
