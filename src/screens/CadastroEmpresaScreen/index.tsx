/* eslint-disable react/no-children-prop */
import React from "react";
import MenuAppBar from "../../components/layout/Header/PrivateLayout";
import { withSession } from "../../services/auth/session";

import axios from "axios";
import { tokenService } from "../../services/auth/tokenService";

export const getServerSideProps = withSession(async (ctx) => {
  // Recupera a sessão
  const session = ctx.req.session;

  // Faz a chamada ao endpoint adicional
  let userInfo = null;
  const token = tokenService.get(ctx);
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/user_info`, {
      headers: {
        'Authorization': `Bearer${token}`
      }
    });
    userInfo = response;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }

  return {
    props: {
      session,
      userInfo,
      token,
    }
  };
});


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



