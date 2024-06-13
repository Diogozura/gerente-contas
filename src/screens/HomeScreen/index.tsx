/* eslint-disable react/no-children-prop */
import { blue } from "@mui/material/colors";
import styled from "styled-components";


import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { tokenService } from "../../services/auth/tokenService";
import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { authService } from "../../services/auth/authService";





export default function HomeScreen() {
    const onClick = async (ctx) => {
      await authService.getSession(ctx)
      }
    return (
        <>
            

            <Grid height={'100vh'}>
            <h1>Bem vindo a home</h1>
                <Link href={'/sala'}>Sala</Link>
                <Button onClick={onClick}>
          Verifica o token
        </Button>
            </Grid>
     
        </>
    )
}