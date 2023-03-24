import axios from "axios"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { setClientsData, selectClient } from "../features/clients/clientsSlice"
import DeleteClient from "./DeleteClient"
import NewClient from "./NewClient"
import EditClient from "./EditClient"



export default function FormClient({ dateSelected }) {
    const dispatch = useDispatch();
    const { clients } = useSelector((state) => state.clients)
    const { userId } = JSON.parse(localStorage.getItem("user"));

    const workdateDate = (client) => {
        const indexDate = client.workdates.findIndex(date => date.date === dateSelected)
        dispatch(selectClient([client, indexDate]))
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/clients/" + userId)
            dispatch(setClientsData(response.data))
            return
        }
        fetchData()
    }, [dispatch, userId]);


    return (<ContentClient className="content-client">
        <h2>Vos clients</h2>
        {clients ? clients.map((client) => (
            <div key={client.id}>
                <div className="label-input">
                    <label htmlFor={client.name}>{client.name}</label>
                    <input className="radio" type="radio" name="client" id={client.name} onClick={() => workdateDate(client)} />
                </div>
                <div className="edit-delete">
                    <DeleteClient userId={userId} client={client} />
                    <EditClient userId={userId} client={client} />
                </div>
            </div>
        )) : null}
        <NewClient userId={userId} />
    </ContentClient >)
}

const ContentClient = styled.div`
    width: 200px;
    margin: 2rem auto;
    h2 {
        margin-bottom: 1rem;
    }
    button {
        cursor: pointer;
    }
    &>div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .label-input {
        display: flex;
        align-items: center;
        width: max-content;
        label {
            text-align: start;
            line-break: anywhere;
        }
    }
    .edit-delete {
        display: flex;
        align-items: center;
    }
`

