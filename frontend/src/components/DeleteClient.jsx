import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClientData, resetClient } from '../features/clients/clientsSlice';
import axios from 'axios';
import { useState } from 'react';

export default function DeleteClient({ userId, client }) {
    const dispatch = useDispatch()
    const { clientSelected } = useSelector(state => state.clients)
    const [confirmDelete, setConfirmDelete] = useState(false)


    const deleteClient = async () => {
        hideContent()
        try {
            const response = await axios.delete("http://localhost:5000/clients/" + userId, {
                data: {
                    id: client.id
                }
            })
            if (clientSelected.id === client.id) {
                dispatch(resetClient())
            }
            dispatch(deleteClientData(response.data.deletedClient));
        } catch (error) {
            console.log(error);
        }
    }
    const hideContent = () => {
        document.querySelector(".confirm-content").classList.add("hide-confirm-content")
        setTimeout(() => {
            setConfirmDelete(false)
        }, 500);
    }
    return (<>
        <Icon path={mdiDelete} size={1} className="delete" onClick={() => setConfirmDelete(true)} />
        {
            confirmDelete ?
                <div className="confirm-content">
                    <div className="content-delete">
                        <h2>Souhaitez vous  <span>supprimer entièrement de la base de donnée</span> le client : {client.name}</h2>
                        <div className="content-button">
                            <div className="button cancel" onClick={() => hideContent()}>Annuler</div>
                            <div className="button danger-button" onClick={() => deleteClient()}>Supprimer</div>
                        </div>
                    </div>
                </div> : null
        }
    </>)
}