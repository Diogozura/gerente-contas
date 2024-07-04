/* eslint-disable react/no-children-prop */
import React from "react";
import MenuAppBar from "../../components/layout/Header/PrivateLayout";
import { withSession } from "../../services/auth/session";

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session
    }
  }
})


export default function Settings(props) {
    return (
        <>
            <MenuAppBar children={undefined} />
      
            <pre>
            {JSON.stringify(props, null, 2)}
        </pre> 
        </>
    )
}


