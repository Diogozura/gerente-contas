/* eslint-disable react/no-children-prop */
import { blue } from "@mui/material/colors";
import styled from "styled-components";
import HeaderHome from "../../components/Header/HeaderHome";
import LinkPage from "../../components/Link";


const Conteudo = styled.main`
    width: 700px;
    margin: 1rem auto;
    text-align: center;
    display: grid;

    @media only screen and (max-width: 600px) {
        width: 80%;
    }
`


export default function HomeScreen() {
    return (
        <>
            <HeaderHome children={undefined} />
            <Conteudo>
            <h1>Bem vindo a home</h1>
                <LinkPage href={'/sala'} name={'Sala'} color={"white"} bg={blue[400]} padding={"10px"} hoverBg={blue[300]} margin={"1em"} />
                
            </Conteudo>
     
        </>
    )
}