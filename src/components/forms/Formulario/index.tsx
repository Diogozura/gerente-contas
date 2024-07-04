import styled from "styled-components";

export const BoxForm = styled.article`
    width: 600px;
    background-color: #f5f5f5;
    margin: 3em auto;
    border-radius: 20px;
    padding: 3rem;
    border-style: solid;
    @media only screen and (max-width: 650px){
        width: 80%;
        margin: 0.5rem auto;
    }
`
export const Formulario = styled.form`
    width: 400px;
    margin: auto;
    display: grid;
    justify-content: space-around;
    justify-items: center;
    @media only screen and (max-width: 600px) {
        width: 80%;
    }
`