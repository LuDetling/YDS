import React, { useEffect } from "react";
import { useForm } from 'react-hook-form'
import styled from "styled-components";
import colors from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/user/userSlice';

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [errorLogin, setErrorLogin] = useState("");
    const { error, loading, userInfo, success } = useSelector(state => state.user)

    useEffect(() => {
        if (success) navigate("/");
    }, [navigate, userInfo, success]);

    // Se connecter
    const onSubmit = (user) => {
        dispatch(loginUser(user))
    }
    return <ContentInscription>
        <h1>Se connecter</h1>
        <FormContent onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="Email" />
            </div>

            {(errors.email?.type && <p>Email incorrect</p>) || (error === "Utilisateur non trouvé !" && <p>Email invalide</p>)}
            <div>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" {...register("password", { required: true, minLength: 8 })} placeholder="Mot de passe" />
            </div>
            {(errors.password?.type || error === "Mot de passe incorrect !") && (<p>Mot de passe incorrect</p>)}

            {loading ? <div>Chargement</div> : <input type="submit" value="Se connecter" className="button" />}

        </FormContent>
    </ContentInscription>
}

const ContentInscription = styled.div`
    background-color: ${colors.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: auto;
    padding: 2rem;
    border-radius: 10px;
    color: white;
    margin-top: 3rem;
    h1 {
        text-align: center;
        margin-bottom: 2rem;
        text-decoration: underline;
    }
`

const FormContent = styled.form`
    width: fit-content;
    margin: auto;
  
div {
    display: flex;
    align-items: center;
    margin: .5rem 0 ;
    label {
        width: 100px;
    }
    input {

    }
}
p {
    color: red;
}

input {
    margin: 0.4rem;
}

    &>input {
        margin: auto;
        display: block;
        margin-top: 1rem;
    }
`