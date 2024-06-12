/* eslint-disable react/no-children-prop */
import { blue } from "@mui/material/colors";
import styled from "styled-components";


import { Grid } from "@mui/material";
import Link from "next/link";





export default function HomeScreen() {
    return (
        <>
            

            <Grid height={'100vh'}>
            <h1>Bem vindo a home</h1>
                <Link href={'/sala'}>Sala</Link>
                <a href="/api/auth/signin">Login</a>
            </Grid>
     
        </>
    )
}