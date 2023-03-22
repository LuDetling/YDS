import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { showClients } from "../store/client/client"

export default function FormClient() {
    const dispatch = useDispatch()
    const { clients } = useSelector(state => state.client)
    //exemple de clients tcs = timesClients
    const tcs = [{
        name: "Mapple",
        workdate: [{
            date: "02-03-2023",
            hours: ["08:00", "08:30", "15:00"],
        }]
    }, {
        name: "Lurto",
        workdate: [{
            date: "02-03-2023",
            hours: ["08:00", "08:30", "17:00"],
        }]
    }]
    function onsubmit(e) {
        e.preventDefault()
        dispatch(showClients)
        console.log(clients);

    }
    //Checkbox - submit - 
    return (<ContentForm>
        {/* {tcs.map(tc => (
            <div>
                <label htmlFor="client">{tc.name}</label>
                <input type="checkbox" name="client" id="client" />
            </div>
        ))} */}
        <button onClick={onsubmit}>+</button>
    </ContentForm>)
}

const ContentForm = styled.form`
    width: 100px;
    margin: 2rem auto;
    button {
        cursor: pointer;
    }
`