import React from "react"
import { AccontsContext } from "../../../../common/counts"
import { HttpClient } from "../../../../infra/HttpClient/HttpClient"
import { authService } from "../../../../services/auth/authService"
import { tokenService } from "../../../../services/auth/tokenService"

export default function TemCoxt(ctx) {
    const { accont } = React.useContext(AccontsContext)
    authService.organiza(accont)
    console.log(accont)

    
    return (
        <>
            {accont}
        </>
    )
}

