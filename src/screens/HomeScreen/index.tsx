/* eslint-disable react/no-children-prop */
import { blue } from "@mui/material/colors";
import styled from "styled-components";
import HeaderHome from "../../components/base/Header/HeaderHome";

import { Grid } from "@mui/material";
import Link from "next/link";





export default function HomeScreen() {
    return (
        <>
            
            <HeaderHome children={undefined}  />
            <Grid height={'100vh'}>
            <h1>Bem vindo a home</h1>
                <Link href={'/sala'}>Sala</Link>
                
            </Grid>
     
        </>
    )
}