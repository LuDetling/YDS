import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { setClientsData, selectClient, resetClient } from "../features/clients/clientsSlice"
import DeleteClient from "./DeleteClient"
import NewClient from "./NewClient"
import EditClient from "./EditClient"
import Icon from '@mdi/react';
import { mdiSquareEditOutline } from '@mdi/js';





export default function FormClient({ dateSelected }) {
    const dispatch = useDispatch();
    const { clients } = useSelector((state) => state.clients)
    const { userId } = JSON.parse(localStorage.getItem("user"));
    const [edit, setEdit] = useState(false)
    const [clientSelected, setClientSelected] = useState()

    const sendWorkDate = (client) => {
        dispatch(resetClient())
        const indexDate = client.workdates.findIndex(date => date.date === dateSelected);
        if (client.workdates[indexDate]) {
            const hours = client.workdates[indexDate].hours;
            dispatch(selectClient([client, hours]))
            return
        }
        dispatch(selectClient([client, []]))
        return
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/clients/" + userId)
            dispatch(setClientsData(response.data))
            return
        }
        fetchData()
    }, [dispatch, userId]);

    //au click => client selectionné peut être edité 
    const handleEdit = (client) => {
        setClientSelected(client)
        if (!clientSelected) {
            console.log(clientSelected);
            setEdit(!edit)
            return
        } else if (clientSelected !== client) {
            return
        }
        setEdit(!edit)
    }

    return (<ContentClient className="content-client">
        <h2>Vos clients</h2>
        {clients ? clients.map((client) => (
            <div key={client.id}>
                <div className="label-input">
                    <label htmlFor={client.name}>{client.name}</label>
                    <input className="radio" type="radio" name="client" id={client.name} onClick={() => sendWorkDate(client)} />
                    <Icon path={mdiSquareEditOutline} size={1} onClick={() => handleEdit(client)} />
                    <DeleteClient userId={userId} client={client} />
                </div>
                {clientSelected ? client.id === clientSelected.id && edit && < div className="edit-delete">
                    <EditClient userId={userId} client={clientSelected} edit={edit} resetEdit={value => setEdit(value)} />
                </div> : null}
            </div>
        )
        ) : null
        }
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
        flex-direction: column;
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

