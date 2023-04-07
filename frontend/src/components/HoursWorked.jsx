import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateClientData,
  selectClient,
  resetClient,
} from "../features/clients/clientsSlice";

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

export default function HoursWorked({ dateSelected }) {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const clientSelected = useSelector((state) => state.clients.clientSelected);
  const hoursDay = useSelector((state) => state.clients.hoursDay);
  const [validForm, setValidForm] = useState("");

  useEffect(() => {
    dispatch(resetClient());
  }, [dispatch]);

  const checkDate = () => {
    return clientSelected.workdates.findIndex(
      (date) => date.date === dateSelected
    );
  };

  const updateClient = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/clients/" + clientSelected.userId,
        {
          id: clientSelected.id,
          workdates: clientSelected.workdates,
        }
      );
      dispatch(updateClientData(response.data.updateClients));
    } catch (error) {
      console.log(error);
    }
  };

  // show if hours and date are in client selected
  const activeHours = (e, hours) => {
    e.preventDefault();
    setIsSelected(true);
    setValidForm(true);
    const defaultWorkdate = {
      date: null,
      hours: [],
    };
    const newClientSelected = { ...clientSelected };
    let newWorkdatesArray = [...clientSelected.workdates];
    //if date exist
    if (checkDate() !== -1) {
      const newWorkdatesObject = { ...newWorkdatesArray[checkDate()] };
      let newHours = [...newWorkdatesObject.hours];
      const findHours = newHours.findIndex((value) => value === hours);
      if (findHours === -1) {
        newHours.push(hours);
      } else {
        const filterHours = newHours.filter((value) => value !== hours);
        newHours = filterHours;
      }
      //delete if no hours selected at this date
      if (newHours.length === 0) {
        const workdatesFilter = newWorkdatesArray.filter(
          (value) => value.date !== newWorkdatesObject.date
        );
        newWorkdatesArray = workdatesFilter;
      } else {
        newWorkdatesArray[checkDate()] = newWorkdatesObject;
      }
      newWorkdatesObject.hours = newHours;
      newClientSelected.workdates = newWorkdatesArray;
      dispatch(selectClient([newClientSelected, newHours]));
    } else {
      defaultWorkdate.date = dateSelected;
      defaultWorkdate.hours.push(hours);

      newWorkdatesArray.push(defaultWorkdate);
      newClientSelected.workdates = newWorkdatesArray;

      dispatch(selectClient([newClientSelected, defaultWorkdate.hours]));
    }
  };

  //validation hours for client

  const validHours = () => {
    if (!validForm) {
      return;
    }
    updateClient();
    setValidForm(false);
  };

  return (
    <ContentSelector id="content-hours">
      {hoursArray.map((value) => (
        <div className="content-hours" key={value}>
          <div className="hours">{value}</div>
          {clientSelected ? (
            <div
              className={
                hoursDay.find((hour) => hour === value)
                  ? "select active-hour"
                  : "select"
              }
              onMouseDown={clientSelected ? (e) => activeHours(e, value) : null}
              onMouseOver={
                isSelected && clientSelected
                  ? (e) => activeHours(e, value)
                  : null
              }
              onMouseUp={() => setIsSelected(false)}
              onMouseOut={() => setIsSelected(false)}
            ></div>
          ) : (
            <div className="select"></div>
          )}
        </div>
      ))}
      {clientSelected ? (
        <>
          <button
            className={
              validForm ? "button valid-button" : "button disable-button"
            }
            onClick={() => validHours()}
          >
            Valider
          </button>
        </>
      ) : null}
    </ContentSelector>
  );
}

const ContentSelector = styled.div`
  margin: 2rem auto;
  width: 200px;
  button {
    margin-top: 1rem;
  }
  .content-hours {
    width: 100%;
    display: flex;
    .hours {
      width: 60px;
      line-height: 30px;
    }
    div {
      border-bottom: 1px solid white;
    }
    .select {
      cursor: pointer;
      width: 100%;
      border-left: 1px solid white;
      &.active-hour {
        background-color: hsl(1, 75%, 80%);
        border-left-color: rgb(232, 95, 92);
        border-bottom: none;
      }
    }
  }
`;
