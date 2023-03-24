import { useParams } from "react-router-dom";
import styled from "styled-components";
import FormClient from "../../components/FormClient";
import HoursWorked from "../../components/HoursWorked";

export default function Agenda() {
  const dateParams = useParams().date.split("-", 3),
    day = dateParams[0],
    month = dateParams[1] - 1,
    year = dateParams[2],
    date = new Date(year, month, day).toLocaleDateString("fr-FR", {
      weekday: "long",
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  return (
    <AgendaContent>
      <h1>{date}</h1>
      <Content >
        <HoursWorked dateSelected={useParams().date} />
        <FormClient dateSelected={useParams().date} />
      </Content>

    </AgendaContent>
  );
}
const AgendaContent = styled.section`
  margin: 20px 0;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`
