/* eslint-disable react/no-children-prop */
import React from "react";
import { withSession } from "../../services/auth/session";
import { authService } from "../../services/auth/authService";
import Link from "next/link";
import { tokenService } from "../../services/auth/tokenService";
import { requireAuthentication } from "../../helpers/auth";

export const getServerSideProps = requireAuthentication(async (ctx) => {
  const token = ctx.req.token;
  return {
        props: {
          
        },
      };
  // try {
  //   const dadosSala = await authService.dadosSala(token);

  //   
  // } catch (error) {
  //   return {
  //     redirect: {
      
  //       permanent: true,
  //     },
  //   };
  // }
});

function Sala(props) {
  return (
    <>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      <Link href={'/dashboard'}>Dashboard</Link>
    </>
  );
}

export default Sala;