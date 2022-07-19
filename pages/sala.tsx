/* eslint-disable react/no-children-prop */
// export { default, getServerSideProps } from "../src/screens/SalaScreen";

import React from "react";
import MenuAppBar from "../src/components/Header/HeaderDentro";
import { withSession } from "../src/services/auth/session";

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
            
            <MenuAppBar children={undefined} />
        <h1>Bem vindo</h1>
            <pre>
        {/* {JSON.stringify(props, null, 2)} */}
      </pre> 
        </>
    )
}

export default Sala