/* eslint-disable react/no-children-prop */
import React from "react";
import { withSession } from "../../services/auth/session";
import { authService } from "../../services/auth/authService";
import Link from "next/link";
import { tokenService } from "../../services/auth/tokenService";

export const getServerSideProps = withSession(async (ctx) => {
  const session = ctx.req.session;
  const token = ctx.req.token;
console.log('token', token)
console.log('session', session)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const dadosSala = await authService.dadosSala(token);
console.log(dadosSala)
    return {
      props: {
        session,
        dadosSala,
      },
    };
  } catch (error) {
    console.log('error',)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
});

function Sala(props) {
  return (
    <>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <Link href={'/dashboard'}>Dashboard</Link>
    </>
  );
}

export default Sala;