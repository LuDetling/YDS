import styled from "styled-components";
// import colors from "../styles/colors";

const ContentSelector = styled.div`
  margin: 2rem auto;
  width: 200px;
  .content-hours {
    width: 100%;
    display: flex;
    div {
      padding: 0.5rem;
      border-bottom: 1px solid black;
    }
    .select {
      cursor: pointer;
      width: 100%;
      border-left: 1px solid black;
      &.active-hour {
        background-color: hsl(1, 75%, 80%);
        border-left-color: rgb(232, 95, 92);
        border-bottom: none;
      }
    }
  }
`;
const hoursArray = [];
let min = 0;
let hour = 8;
const allHours = () => {
  while (hour < 18) {
    if (min === 0) {
      if (hour < 10) {
        hoursArray.push(`0${hour}:0${min}`);
      } else {
        hoursArray.push(`${hour}:0${min}`);
      }
      min = 30;
    } else {
      if (hour < 10) {
        hoursArray.push(`0${hour}:${min}`);
      } else {
        hoursArray.push(`${hour}:${min}`);
      }
      min = 0;
      hour++;
    }
  }
  // hoursArray.push("24:00");
};
allHours();

export default function HoursWorked() {
  const hourSelected = (e) => {
    e.target.classList.toggle("active-hour");
  };

  return (
    <ContentSelector>
      {hoursArray.map((value) => (
        <div className="content-hours" key={value}>
          <div >{value}</div>
          <div className="select" onClick={(e) => hourSelected(e)}></div>
        </div>
      ))}
    </ContentSelector>
  );
}
