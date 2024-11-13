import { Container, Grid, Typography } from "@mui/material";
import { themes } from "../../../../styles/themes/themes";
import Link from "next/link";

  export default function BaseForm({children, titulo}){
    return (
        <>
        <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: 'column',
          minHeight: "50vh",
          backgroundColor: '#FBFBFB',
          borderRadius:5
        }}
      >
            <Grid 
            display={'flex'} 
            textAlign={'center'}
            flexWrap={'nowrap'}
            direction={'column'}
            height={'100px'}
            >

                <Typography 
                variant="h4"
                component={'p'}>
              HubeeFive
                </Typography> 

              <Typography 
              variant="h6"
              component={'h3'} 
              textTransform={'uppercase'}
              fontWeight={'bold'}
              >
                  {titulo}
                </Typography> 

            </Grid>
        <Grid>
        {children}
        </Grid>
           
            <Grid p={3}>
            <Typography variant="body1" textAlign={"center"} component={"p"}  >
                Não tem plano , <Link href={"/"} style={{textDecoration: 'underline'}}>Escolha um agora mesmo</Link>
              </Typography>
              <Typography variant="body1" textAlign={"center"} component={"p"}>
                <Link href={"/auth/trocar-senha"} style={{textDecoration: 'underline'}} > Esqueceu a senha ?</Link>
              </Typography>
            </Grid>
            <Typography variant="body1" textAlign={"center"} p={10} component={"p"}>
                Garantimos a privacidade dos seus dados com criptografia.
              </Typography>
      </Container>
        </>
  
        
    )
}