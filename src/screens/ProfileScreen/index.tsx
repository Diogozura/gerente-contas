/* eslint-disable react/no-children-prop */
import React from "react";
import MenuAppBar from "../../components/base/Header/PrivateLayout";
import { withSession } from "../../services/auth/session";
import { Typography } from "@mui/material";

export const getServerSideProps = withSession((ctx) => {
    return {
      props: {
        session: ctx.req.session
      }
    }
  })

export default function Profile(props) {
    return (
        <>
            <pre>
            {JSON.stringify(props, null, 2)}
        </pre> 
        <Typography> Adod adoadoso</Typography>
        </>
    )
}


