import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateClientData, selectClient, resetClient } from "../features/clients/clientsSlice";

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

const defaultWorkdate = {
  date: null,
  hours: []
}


export default function HoursWorked({ dateSelected }) {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false)
  const clientSelected = useSelector(state => state.clients.clientSelected);
  const hoursDay = useSelector(state => state.clients.hoursDay)

  useEffect(() => {
  }, [dispatch]);

  const checkHours = (indexHour, value) => {
    return clientSelected.workdates[indexHour].hours.findIndex(hour => hour === value);
  }

  const checkDate = () => {
    return clientSelected.workdates.findIndex(date => date.date === dateSelected);
  }

  const updateClient = async (data) => {
    try {
      const response = await axios.put("http://localhost:5000/clients/" + clientSelected.userId, {
        id: clientSelected.id,
        workdates: data,
      })
      dispatch(updateClientData(response.data.updateClients));
      dispatch(selectClient([response.data.updateClients, hoursDay]))
    } catch (error) {
      console.log(error);
    }
  }

  const initClient = () => {
    return clientSelected.workdates.map((item) => ({
      ...item,
    }))
  }

  const activeBackground = (e, hours) => {
    setIsSelected(true);
    e.target.classList.toggle("active-hour");

  }

  // never open
  const activeHours = (e, hours) => {
    e.preventDefault();
    activeBackground(e, hours)
    const arrayWorkdates = [...clientSelected.workdates];
    const indexDate = checkDate();

    if (indexDate === -1) {
      defaultWorkdate.date = dateSelected;
      defaultWorkdate.hours.push(hours);
      arrayWorkdates.push(defaultWorkdate);
      updateClient(arrayWorkdates);
      return
    }

    const recupHour = [...clientSelected.workdates[indexDate].hours];
    const data = initClient()[indexDate]
    const indexHour = checkHours(indexDate, hours);

    if (indexHour === -1) {
      recupHour.push(hours);
      data.hours = recupHour;
      arrayWorkdates[indexDate] = data
      updateClient(arrayWorkdates);
      return
    } else {
      const filterHour = recupHour.filter(e => e !== hours)
      data.hours = filterHour;
      arrayWorkdates[indexDate] = data
      updateClient(arrayWorkdates);
      return
    }
  }

  return (
    <ContentSelector id="content-hours" >
      {hoursArray.map((value) => (
        <div className="content-hours" key={value} >
          <div >{value}</div>
          {
            clientSelected ? <div className={hoursDay.find(hour => hour === value) ? "select active-hour" : "select"} onMouseDown={clientSelected ? (e) => activeHours(e, value) : null} onMouseOver={isSelected && clientSelected ? (e) => activeHours(e, value) : null} onMouseUp={() => setIsSelected(false)} onMouseOut={() => setIsSelected(false)}></div> : <div className="select"> </div>
          }
        </div>
      ))
      }
    </ContentSelector >
  );
}

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
