import { useState } from "react";
import axios from 'axios';
import { useForm } from 'react-hook-form'
import colors from "../../styles/colors"

import styled from "styled-components";

export default function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [errorEmail, setErrorEmail] = useState(false);

    const onSubmit = async (user) => {
        console.log(user);
        try {
            const data = await axios.post("http://localhost:5000/auth/signup", JSON.stringify(user), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            // envoyer dans le localstorage les données de sa connection peut etre pendant 24h faut voir avec le back si je peux pas laisser tout le temps le token
            return data
        } catch (error) {
            if (error.response.data.error.meta.target === "user_email_key") {
                setErrorEmail(true);
            }
        }
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
                <input type="text" id="email" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} onChange={() => setErrorEmail(false)} placeholder="Email" />
            </div>
            {(errors.email?.type && <p>Email incorrect</p>) || (errorEmail === true && <p>Cette adresse email a déjà été utilisé</p>)}
            <div>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" {...register("password", { required: true, minLength: 8 })} placeholder="Mot de passe" />
            </div>
            {errors.password?.type && <p>Mot de passe trop court, minimum 8 charateres</p>}
            <input type="submit" value="S'inscrire" className="button" />

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