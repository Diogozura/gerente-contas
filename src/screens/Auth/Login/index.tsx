import {
  Container,
  Grid,
  Typography,
} from "@mui/material";

import React, { FormEvent, useState } from "react";

import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "./Form";

export function Login() {
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Grid padding={2}>
          <Typography
            variant="h4"
            m={2}
            color={"text.secondary"}
            component={"h1"}
            textAlign={"center"}
          >
            Login
          </Typography>

          <LoginForm />
        </Grid>
      </Container>

     
      {/* <CadastroForm /> */}
    </>
  );
}
