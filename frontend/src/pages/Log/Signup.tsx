import React, { useState } from "react";
import FormComponent from "../../components/FormComponent.tsx"
import axios from 'axios';

import styled from "styled-components";

const FormContent = styled.form`
    width: fit-content;
    margin: auto;
    &>input {
        margin: auto;
        display: block;
        margin-top: 1rem;
    }
`

export default function Signup() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const createUser = async (e: Event) => {
        //faire le formulaire qui vérifie
        e.preventDefault();
        const form = document.querySelector("#test") as HTMLInputElement
        user.firstName = form.getElementsByTagName('input')[0].value;
        user.lastName = form.getElementsByTagName('input')[1].value;
        user.email = form.getElementsByTagName('input')[2].value;
        user.password = form.getElementsByTagName('input')[3].value;        
        
        await axios.post("http://localhost:5000/auth/signup", JSON.stringify(user),{
            headers: {
                'Content-Type': 'application/json'
              }
        })
    }

    const settings = [{
        label: "Nom",
        type: "text"
    }, {
        label: "Prénom",
        type: "text"
    }, {
        label: "Email",
        type: "text"
    }, {
        label: "Mot de passe",
        type: "password"
    },]

    return <FormContent id="test" onSubmit={createUser}>
        <FormComponent content={settings}  />
        <input type="submit" value="S'inscrire" />

    </FormContent>
}