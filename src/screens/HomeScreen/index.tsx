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
                <LinkPage href={'/sala'} name={'Sala'} />
                <LinkPage href={'/login'} name={'Login'} onClick={()=>{ console.log('aiaiai')} } />
                <LinkPage href={'/cadastro'} name={'Cadastra-se'} />
            </Conteudo>
     
        </>
    )
}