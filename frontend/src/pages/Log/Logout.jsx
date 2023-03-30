import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userSlice';
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';



export default function Logout() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logout = () => {
        dispatch(logoutUser());
        navigate("/login");
        return;
    }
    return <button className="button logout-button" onClick={logout}><Icon path={mdiLogout} size={1} />
    </button>
}