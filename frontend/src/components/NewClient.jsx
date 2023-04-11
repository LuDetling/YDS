import axios from "axios";
import { useDispatch } from "react-redux";
import { newClientData } from "../features/clients/clientsSlice";
import { useState } from "react";
import styled from "styled-components";


export default function NewClient({ userId, clients }) {
    const dispatch = useDispatch()
    const [newClient, setNewClient] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    const verifClients = (value) => {
        const findClient = clients.findIndex(client => client.name.toUpperCase() === value.toUpperCase());
        if (findClient > -1) {
            setErrorMessage(true)
        } else {
            setErrorMessage(false)

        }
        return findClient
    }

    const addNewClient = async (e) => {
        e.preventDefault()
        if (!errorMessage) {
            const response = await axios.post("http://localhost:5000/clients/" + userId, {
                name: e.target[0].value
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            dispatch(newClientData(response.data))
            setNewClient(false)
            return
        }
    }

    return (<>
        <button onClick={() => setNewClient(!newClient)}>+</button>
        {/* si un client existe déja a ce nom alors message d'erreur */}
        {
            newClient ? <ContentNewClient onSubmit={addNewClient}>
                <label htmlFor="client">Client</label>
                <input type="text" name="client" id="client" onChange={(e) => verifClients(e.target.value)} />
                <input type="submit" value="Créer" />
            </ContentNewClient> : null
        }
        {
            errorMessage && <div>Ce client existe déjà !</div>
        }
    </>)

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