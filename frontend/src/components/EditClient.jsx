import axios from "axios";
import { useDispatch } from "react-redux";
import { updateClientData } from "../features/clients/clientsSlice";

export default function UpdateClient({ client, userId, resetEdit, edit }) {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
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
    }

    return <>
        {
            client ? <form onSubmit={handleSubmit} >
                <input type="text" name="name" id="name" defaultValue={client.name} />
                <input type="submit" value="Modifier" />
            </form> : null
        }
    </>
} 