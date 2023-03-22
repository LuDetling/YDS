import axios from "axios"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { setClientsData } from "../features/clients/clientsSlice"
import DeleteClient from "./DeleteClient"
import NewClient from "./NewClient"
import UpdateClient from "./updateClient"


export default function FormClient() {
    const dispatch = useDispatch();
    const { clients } = useSelector((state) => state.clients)
    const { userId } = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/clients/" + userId)
            dispatch(setClientsData(response.data))
            return
        }
        fetchData()
    }, [dispatch, userId]);

    //exemple de clients tcs = timesClients
    // const tcs = [{
    //     name: "Mapple",
    //     workdate: [{
    //         date: "02-03-2023",
    //         hours: ["08:00", "08:30", "15:00"],
    //     }]
    // }, {
    //     name: "Lurto",
    //     workdate: [{
    //         date: "02-03-2023",
    //         hours: ["08:00", "08:30", "17:00"],
    //     }]
    // }]

    //Checkbox - submit - 
    return (<ContentClient>
        {clients ? clients.map((client) => (
            <div key={client.id}>
                <label htmlFor={client.name}>{client.name}</label>
                <input type="checkbox" name={client.name} id={client.name} />
                <DeleteClient userId={userId} client={client} />
                <UpdateClient userId={userId} client={client} />
            </div>
        )) : null}
        <NewClient userId={userId} />
    </ContentClient >)
}

const ContentClient = styled.div`
    width: 300px;
    margin: 2rem auto;
    button {
        cursor: pointer;
    }
    /* &:hover {
        .delete {
            display: block;
        }
    }
    .delete {
        display: none;
    } */
`

