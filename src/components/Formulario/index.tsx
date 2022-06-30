import styled from "styled-components";

export const BoxForm = styled.article`
    width: 600px;
    background-color: antiquewhite;
    margin: 3em auto;
    border-radius: 20px;
    padding: 3rem;
    @media only screen and (min-width: 650){
        width: 80%;
    }
`
export const Formulario = styled.form`
   
    margin: auto;
    display: grid;
    justify-content: space-around;
    justify-items: center;
    @media only screen and (min-width: 600px) {
        width: 95%;
    }
`