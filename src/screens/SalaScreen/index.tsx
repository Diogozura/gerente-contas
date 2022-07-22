/* eslint-disable react/no-children-prop */
import React from "react";
import MenuAppBar from "../../components/Header/HeaderDentro";
import { withSession } from "../../services/auth/session";
import Organizacoes from "./GetOrganização";
import ResponsiveAppBar from "./headerHome";

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session
    }
  }
})


function Sala() {
    return (
        <>
        <ResponsiveAppBar/>
        <h1>Bem vindo</h1>
            <pre>
        {/* {JSON.stringify(props, null, 2)} */}
        </pre> 
        {/* <Organizacoes/> */}
        </>
    )
}

export default Sala

