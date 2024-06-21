/* eslint-disable react/no-children-prop */
import { blue } from "@mui/material/colors";
import styled from "styled-components";


import { Button, Grid, Typography } from "@mui/material";
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
            <Grid container height={'100vh'}>
                <h1>Bem vindo a Hubeefive</h1>
                <Grid item>
                    <Typography>Conheça nossos planos</Typography>
                    <Typography>Conheça nossos planos</Typography>
                </Grid>
               
            </Grid>
     
        </>
    )
}