import { blue } from "@mui/material/colors";
import LinkPage from "../../components/Link";
import nookie from 'nookies'
import { useRouter } from "next/router";
import React from "react";


export default function Sala(ctx) {
    const router = useRouter()
    const cookie = nookie.get(ctx)
    React.useEffect(() => {
        {cookie.ACCESS_TOKEN_KEY ? '' : router.push("/")}
    })
   
    return (
        <>
             <LinkPage href={'/'} name={'home'}   color={"white"} bg={blue[400]} padding={"10px"} hoverBg={blue[300]} margin={"1em"} />
             <LinkPage href={"/logout"} name={"Sair"} color={"red"}/>
        </>
    )
}