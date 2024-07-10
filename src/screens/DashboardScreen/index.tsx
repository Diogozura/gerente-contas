/* eslint-disable react/no-children-prop */
import React from "react";
import MenuAppBar from "../../components/layout/Header/PrivateLayout";
import { withSession } from "../../services/auth/session";
import Form from "../../components/forms/formPadrao";
import Link from "next/link";
import { tokenService } from "../../services/auth/tokenService";
import nookies from 'nookies';
import { authService } from "../../services/auth/authService";
export const getServerSideProps = withSession(async (ctx) => {
  const session = ctx.req.session;
  const token = ctx.req.token;

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

    return {
      props: {
        session,
        dadosSala,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
});

export default function Dashboard(props) {

    return (
        <>
            Dashboard
            <pre>
            {JSON.stringify(props, null, 2)}
        </pre> 
        <Link href={'/sala'}>Sala</Link>
        
        </>
    )
}




// export default function Dashboard() {
//   const { data: session } = useSession();

//   if (!session) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Welcome, {session.user.email}!</p>
//     </div>
//   );
// }
