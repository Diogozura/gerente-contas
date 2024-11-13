import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Container } from "@mui/material";
import { requireAuthentication } from "../../src/helpers/auth";
import { authService } from "../../src/services/auth/authService";

// export const getServerSideProps = requireAuthentication(async (ctx) => {
//   const token = ctx.req.token;
//   try {
//     const authIntegracaoML = await authService.authIntegracaoML(token);

//     return {
//       props: {
//         authIntegracaoML,
//       },
//     };
//   } catch (error) {
//     return {
//       redirect: {
      
//         permanent: true,
//       },
//     };
//   }
// });

const Pedido = (props) => {
  // const router = useRouter();
  // const url = props.authIntegracaoML.body.dados.url
  // router?.push(url)

  return (
   <>
   </>
  );
};

export default Pedido;
