import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { useDispatch } from 'react-redux';
import { deleteClientData } from '../features/clients/clientsSlice';
import axios from 'axios';

export default function DeleteClient({ userId, client }) {
    const dispatch = useDispatch()
    const deleteClient = async (id) => {
        try {
            const response = await axios.delete("http://localhost:5000/clients/" + userId, {
                data: {
                    id
                }
            })
            dispatch(deleteClientData(response.data.deletedClient))
        } catch (error) {
            console.log(error);
        }
    }
    return (<Icon path={mdiDelete} size={1} className="delete" onClick={() => deleteClient(client.id)} />
    )
}