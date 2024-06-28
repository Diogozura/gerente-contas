/* eslint-disable react/no-children-prop */
import { blue } from "@mui/material/colors";
import styled from "styled-components";

import { Button, colors, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { tokenService } from "../../services/auth/tokenService";
import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { authService } from "../../services/auth/authService";
import { themes } from "../../../styles/themes";
import { Theme } from '@mui/material/styles';
import SpacingGrid from "./Cards";

export default function HomeScreen() {
  const onClick = async (ctx) => {
    await authService.getSession(ctx);
  };


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography,
    padding: 1,
    textAlign: 'center',
    color: colors.blue,
  }));
  return (
    <>
      <Grid container >
        <h1>Bem vindo a Hubeefive</h1>

       <SpacingGrid >
      
            <Grid  item>
              <Paper
                sx={{
                  height: 500,
                  width: 350,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >Item 1</Paper>
            </Grid>
      
            <Grid  item>
              <Paper
                sx={{
                  height: 500,
                  width: 350,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <Link 
                  href={{
                    pathname: '/pedido',
                    query: { name: 'item 2' },
                  }}
                >
                Pagina de compra
                </Link>
                Item 2
              
              </Paper>
            </Grid>
      
            <Grid  item>
              <Paper
                sx={{
                  height: 500,
                  width: 350,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >Item 3</Paper>
            </Grid>
          
       </SpacingGrid>
        
        <Grid item>
          <Typography>Conheça nossos planos</Typography>
          <Typography>Conheça nossos planos</Typography>
        </Grid>
      </Grid>
    </>
  );
}
