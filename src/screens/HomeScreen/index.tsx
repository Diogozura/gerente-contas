import { blue } from "@mui/material/colors";
import styled from "styled-components";
import LinkPage from "../../components/Link";


const Conteudo = styled.main`
    width: 700px;
    margin: auto;
    text-align: center;
    display: grid;
`


export default function HomeScreen() {
    return (
        <>
            <Conteudo>
            <h1>Bem vindo a home</h1>
                <LinkPage href={'/sala'} name={'Sala'} color={"white"} bg={blue[400]} padding={"10px"} hoverBg={blue[300]} margin={"1em"} />
                <LinkPage href={'/login'} name={'Login'} color={"white"} bg={blue[400]} padding={"10px"} hoverBg={blue[300]} margin={"1em"}/>
                <LinkPage href={'/cadastro'} name={'Cadastra-se'} color={"white"} bg={blue[400]} padding={"10px"} hoverBg={blue[300]}margin={"1em"} />
            </Conteudo>
     
        </>
    )
}