/* eslint-disable react/no-children-prop */
import React from "react";
import AccontsProvider from "../../common/counts";
import { withSession } from "../../services/auth/session";
import Organizacoes from "./GetOrganização";
import ResponsiveAppBar from "./headerHome";



export const getServerSideProps = withSession ((ctx) => {
  return {
    props: {
      session: ctx.req.session,
      org: ctx.req.org,
      acconts: ctx.req.acconts,
    }
  }
  
})


function Sala(props) {
  console.log('minhas contas', props.org)
    return (
        <>
        <ResponsiveAppBar/>
        <h1>Bem vindo</h1>
            <pre>
        {JSON.stringify(props.session , null, 2)}
        </pre> 
        {/* <AccontsProvider> */}
          <Organizacoes props={props.org} />
        {/* </AccontsProvider> */}
        
       
       
        </>
    )
}

export default Sala

