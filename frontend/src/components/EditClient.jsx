import axios from "axios";
import { useDispatch } from "react-redux";
import { updateClientData } from "../features/clients/clientsSlice";
import { useState } from "react";

export default function UpdateClient({ client, userId, resetEdit, edit, clients }) {
    const [errorMessage, setErrorMessage] = useState(false);
    const dispatch = useDispatch();

    const verifClients = (value) => {
        const findClient = clients.findIndex(client => client.name.toUpperCase() === value.toUpperCase());
        if (findClient > -1 && clients[findClient].name !== client.name) {
            setErrorMessage(true)
        } else {
            setErrorMessage(false)
        }
        return findClient
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (verifClients(e.target[0].value) === -1 || clients[verifClients(e.target[0].value)].name === client.name) {

            try {
                const response = await axios.put("http://localhost:5000/clients/" + userId, {
                    id: client.id,
                    name: e.target[0].value,
                })
                dispatch(updateClientData(response.data.updateClients));
            } catch (error) {
                console.log(error);
            }
            resetEdit(!edit)
            return
        }
    }

    return <>
        {
            client ? <form onSubmit={handleSubmit} >
                <input type="text" name="name" id="name" defaultValue={client.name} onChange={(e) => verifClients(e.target.value)} />
                <input type="submit" value="Modifier" />
            </form> : null
        }
        {
            errorMessage && <div>Vous avez déjà un client à ce nom !</div>
        }
    </>
} 