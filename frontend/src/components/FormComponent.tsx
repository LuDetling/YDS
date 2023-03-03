import React from "react";
import styled from "styled-components";

const FormDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    label {
        margin-right: 1rem;
    }
`

//boucler les div du formulaire

export default function form(props: any) {
    return (<>
        {(props.content.map((content: { label: string, type: string }, index: number) => (
            <FormDiv key={index}><label htmlFor={content.label} >{content.label}</label>

                <input type={content.type} id={content.label}/>
            </FormDiv>
        )))}
    </>)
}