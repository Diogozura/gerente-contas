/* eslint-disable react/no-children-prop */
import React from "react";
import { withSession } from "../../services/auth/session";
import Accounts from "../AccountsScreen";
import Organizacoes from "./GetOrganização";
import ResponsiveAppBar from "./headerHome";
import LinkOrg from "./org";



export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
      org: ctx.req.org,
      acconts:ctx.req.acconts
    }
  }
  
})


function Sala(props) {
  // lista.map((id) => {
  //   console.log('id do cidadão', id.idOrganization)
  // })
  console.log("sala acconts", props.acconts)
    return (
        <>
        <ResponsiveAppBar props={props.org}/>
      
        <h1>Bem vindo</h1>
            <pre>
        {JSON.stringify(props.session , null, 2)}
        </pre> 
        <Organizacoes props={props.org} />
        <Accounts props={props.acconts}/>
        </>
    )
}

export default Sala

