import { Container, Typography } from "@mui/material";
import Link from "next/link";

export default function Dev(){
    return(
    <>
    <Container>
    <Typography textAlign={'center'} component={'h1'} variant="h2">
        ambiente de teste de dev , componentes 
    </Typography> 
    <Link href={'/dev/forms'}>Forms</Link>
    </Container>
  
    </>
)
}