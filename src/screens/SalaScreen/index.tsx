/* eslint-disable react/no-children-prop */
import { blue } from "@mui/material/colors";
import LinkPage from "../../components/Link";
import nookie from 'nookies'
import { useRouter } from "next/router";
import React from "react";
import MenuAppBar from "../../components/Header/HeaderDentro";



export default function Sala(ctx) {
    const router = useRouter()
    const cookie = nookie.get(ctx)
    React.useEffect(() => {
        {cookie.ACCESS_TOKEN_KEY ? '' : router.push("/")}
    })
   
    return (
        <>
            <MenuAppBar children={undefined} />
             <h1>Bem vindo a home</h1>
        </>
    )
}