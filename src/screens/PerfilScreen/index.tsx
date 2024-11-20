/* eslint-disable react/no-children-prop */
import React from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Head from "next/head";



// export const getServerSideProps = requireAuthentication(async (ctx) => {
//   // const token = ctx.req.token;
//   // try {
//   //   const dadosSala = await authService.dadosSala(token);

//   //   return {
//   //     props: {
//   //       dadosSala,
//   //     },
//   //   };
//   // } catch (error) {
//   //   return {
//   //     redirect: {
      
//   //       permanent: true,
//   //     },
//   //   };
//   // }
// });

export default function Dashboard(props) {

    return (
        <>
           <Head>
            <title>Hubeefive - Perfil</title>
        </Head>
        <Container >
       
        </Container>

     

        </>
    )
}