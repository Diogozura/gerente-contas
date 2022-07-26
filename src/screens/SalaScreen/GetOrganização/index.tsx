import React from "react";
import { authService } from "../../../services/auth/authService"
import { organization } from "../../../services/auth/organization"
import { withSession } from "../../../services/auth/session";
import { tokenService } from "../../../services/auth/tokenService";


  
export default function Organizacoes(props) {
 
    return (
        <>
        <h1>Nome da organização</h1>
        <pre>
        {JSON.stringify(props, null, 2)}
        </pre> 
        </>
       
    )
}
