import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userSlice';

export default function Logout() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logout = () => {
        dispatch(logoutUser());
        navigate("/login");
        return;
    }
    return <button className="button danger-button" onClick={logout}>Se déconnecter</button>
}