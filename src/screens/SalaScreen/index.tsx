/* eslint-disable react/no-children-prop */
import React from "react";
import MenuAppBar from "../../components/base/Header/HeaderDentro";
import { withSession } from "../../services/auth/session";

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session
    }
  }
})


function Sala(props) {
    return (
        <>
            <MenuAppBar children={undefined} />
      
            <pre>
            {JSON.stringify(props, null, 2)}
        </pre> 
        </>
    )
}

export default Sala

