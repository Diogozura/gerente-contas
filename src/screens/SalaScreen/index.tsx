/* eslint-disable react/no-children-prop */
import React from "react";
import MenuAppBar from "../../components/Header/HeaderDentro";
import { authService } from "../../services/auth/authService";
import { organization } from "../../services/auth/organization";
import { withSession } from "../../services/auth/session";
import Organizacoes from "./GetOrganização";
// export { default, getServerSideProps } from "../src/screens/SalaScreen";

import ResponsiveAppBar from "./headerHome";

// export const getServerSideProps = withSession  ((ctx) => {
//   return {
//     props: {
//       session: ctx.req.session
//     }
//   }
  
// })
export async function getServerSideProps() {
 
  withSession((ctx) => {
      return {
        props: {
          session: ctx.req.session
        }
      }
      
  }),
  organization((ctx) => {
      return {
        props: {
          session: ctx.req.organization
        }
      }
      
  })
  
 
}

function Sala(props) {
   console.log('props', props)
  
    return (
        <>
        <ResponsiveAppBar/>
        <h1>Bem vindo</h1>
            <pre>
        {JSON.stringify(props, null, 2)}
        </pre> 
        <Organizacoes props={props} />
        </>
    )
}

export default Sala

