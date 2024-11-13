import {
  Container,
  Grid,
  Typography,
} from "@mui/material";

import React, { FormEvent, useState } from "react";

import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "./Form";
import Head from "next/head";
import BaseForm from '../../../components/forms/baseForm';

export function Login() {
  return (
    <>
    <Head>
    <title>Hubeefive - Login</title>
    </Head>
    <Container component={'main'}   sx={{
      minHeight:'80vh',
      display:"flex",
      alignItems: 'center'
    }}>
    <BaseForm titulo={'User login'}>
    <LoginForm/>
     </BaseForm>
    </Container>
    


      {/* <CadastroForm /> */}
    </>
  );
}
