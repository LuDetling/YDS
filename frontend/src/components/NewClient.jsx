import axios from "axios";
import { useDispatch } from "react-redux";
import { newClientData } from "../features/clients/clientsSlice";
import { useState } from "react";
import styled from "styled-components";


export default function NewClient({ userId }) {
    const dispatch = useDispatch()
    const [newClient, setNewClient] = useState(false);



    const addNewClient = async (e) => {
        e.preventDefault()
        const response = await axios.post("http://localhost:5000/clients/" + userId, {
            name: e.target[0].value
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch(newClientData(response.data))
        setNewClient(false)
    }

    return (<>
        <button onClick={() => setNewClient(!newClient)}>+</button>
        {
            newClient ? <ContentNewClient onSubmit={addNewClient}>
                <label htmlFor="client">Client</label>
                <input type="text" name="client" id="client" />
                <input type="submit" value="Créer" />
            </ContentNewClient> : null
        }</>)
}

const ContentNewClient = styled.form`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    label {
        margin-right: .5rem;
    }
    input:not(:last-child) {
        margin-right: 1rem;
    }`