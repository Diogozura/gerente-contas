/* eslint-disable react/no-children-prop */
import React from "react";
import MenuAppBar from "../../components/base/Header/PrivateLayout";
import { withSession } from "../../services/auth/session";

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session
    }
  }
})


export default function Dashboard(props) {
    return (
        <>
          
            Dashboard
            <pre>
            {JSON.stringify(props, null, 2)}
        </pre> 
        </>
    )
}



