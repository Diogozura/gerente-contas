import { Container, Typography } from "@mui/material";
import CustomModal from "../src/components/common/CustomModal";
import Head from "next/head";

export default function Sobre(){
    return(
        <>
        <Head>
            <title>Hubeefive - Sobre</title>
        </Head>
        <Container>
            <Typography variant="h2" component={'h1'} textAlign={'center'}> 🐝 Sobre HubeeFive 🐝</Typography>
{/* <CustomModal/> */}
        </Container>
        </>
      
    )
}