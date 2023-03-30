import { useForm } from 'react-hook-form'
import colors from "../../styles/colors"

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser } from "../../features/user/auth";

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, errorEmail, success, userInfo } = useSelector(state => state.user.userSignup)
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (success) {
            dispatch(loginUser(userInfo))
            navigate("/")
        };
    }, [navigate, dispatch, userInfo, success,]);

    const onSubmit = (user) => {
        dispatch(signupUser(user))
    }

    return <ContentInscription>
        <Title>S'inscrire</Title>
        <FormContent id="test" onSubmit={handleSubmit(onSubmit)}>
            {/* <fieldset>
                <legend htmlFor="firstName">Nom</legend>
                <input type="text" id="firstName" {...register("firstName", { required: true, minLength: 2 })} placeholder="Nom" />
                {errors.firstName?.type && <p>Nom requis et doit contenir minimum 2 lettres</p>}
            </fieldset> */}
            <div>
                <label htmlFor="firstName">Nom</label>
                <input type="text" id="firstName" {...register("firstName", { required: true, minLength: 2 })} placeholder="Nom" />
            </div>
            {errors.firstName?.type && <p>Nom requis et doit contenir minimum 2 lettres</p>}
            <div>
                <label htmlFor="lastName">Prénom</label>
                <input type="text" id="lastName" {...register("lastName", { required: true, minLength: 2 })} placeholder="Prénom" />
            </div>
            {errors.lastName?.type && <p>Prénom requis et doit contenir minimum 2 lettres</p>}
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="Email" />
            </div>
            {(errors.email?.type && <p>Email incorrect</p>) || (errorEmail === true && <p>Cette adresse email a déjà été utilisé</p>)}
            <div>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" {...register("password", { required: true, minLength: 8 })} placeholder="Mot de passe" />
            </div>
            {errors.password?.type && <p>Mot de passe trop court, minimum 8 charateres</p>}
            {
                loading ? <p>Chargement</p> : <input type="submit" value="S'inscrire" className="button log-button" />
            }


        </FormContent></ContentInscription>
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
    box-shadow: 3px 3px 10px black;
`

const Title = styled.h1`
text-align: center;
margin-bottom: 2rem;
text-decoration: underline;
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
    color: white;
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