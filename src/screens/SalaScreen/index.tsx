/* eslint-disable react/no-children-prop */
import { blue } from "@mui/material/colors";
import LinkPage from "../../components/Link";
import nookies from 'nookies'
import { useRouter } from "next/router";
import React from "react";
import MenuAppBar from "../../components/Header/HeaderDentro";
import { withSession } from "../../services/auth/session";
import { authService } from "../../services/auth/authService";
import { tokenService } from "../../services/auth/tokenService";




export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session
    }
  }
})


// export async function getServerSideProps(ctx) {
//   // const cookies = nookies.get(ctx)
//   // console.log('cookies', cookies)
//   try {
//     const session = await authService.getSession(ctx)
//   return {
//       props: {
//         session
//       }
//   }
//   } catch (err) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/?error=401 '
//       }
//     }
//   }
  
// } 

function Sala( props) {
    // const router = useRouter()
    // const cookie = nookie.get(ctx)
   
    // React.useEffect(() => {
    //     {cookie.ACCESS_TOKEN_KEY ? '' : router.push("/")}
    // })
   
  console.log(props.session)
    return (
        <>
            <MenuAppBar children={undefined} />
        <h1>Bem vindo { props.session.username}</h1>
            <pre>
        {JSON.stringify(props, null, 2)}
      </pre> 
        </>
    )
}

export default Sala

// export const getServerSideProps = withSession((ctx) => {
//     return {
//       props: {
//         session: ctx.req.session,
//       }
//     }
//   })