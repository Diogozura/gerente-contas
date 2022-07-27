/* eslint-disable react/no-children-prop */
import React from "react";
import { withSession } from "../../services/auth/session";
import Organizacoes from "./GetOrganização";
import ResponsiveAppBar from "./headerHome";



export const getServerSideProps = withSession ((ctx) => {
  return {
    props: {
      session: ctx.req.session,
      org: ctx.req.org
    }
  }
  
})


function Sala(props) {

    return (
        <>
        <ResponsiveAppBar/>
        <h1>Bem vindo</h1>
            <pre>
        {JSON.stringify(props.session , null, 2)}
        </pre> 
        <Organizacoes props={props.org} />
        </>
    )
}

export default Sala

