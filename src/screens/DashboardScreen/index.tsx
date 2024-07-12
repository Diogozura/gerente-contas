/* eslint-disable react/no-children-prop */
import React from "react";
import { withSession } from "../../services/auth/session";
import Link from "next/link";
import { authService } from "../../services/auth/authService";
import CustomModal from "../../components/common/CustomModal";
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
            <CustomModal/>
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
