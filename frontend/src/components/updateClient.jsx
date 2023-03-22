import axios from "axios";
import { useDispatch } from "react-redux";
import { updateClientData } from "../features/clients/clientsSlice";
import Icon from '@mdi/react';
import { mdiSquareEditOutline } from '@mdi/js';
import { useState } from "react";



export default function UpdateClient({ client, userId }) {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put("http://localhost:5000/clients/" + userId, {
                id: client.id,
                name: e.target[0].value,
            })
            dispatch(updateClientData(response.data.updateClients))
        } catch (error) {
            console.log(error);
        }
    }


    return <>
        <Icon path={mdiSquareEditOutline} size={1} onClick={() => setEdit(!edit)} />
        {
            edit ? <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="name" defaultValue={client.name} />
                <input type="submit" value="Modifier" />
            </form> : null
        }
    </>
} 