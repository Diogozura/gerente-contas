import React from "react"
import { AccontsContext } from "../../../../common/counts"

import { authService } from "../../../../services/auth/authService"


export default function TemCoxt(ctx) {
    const { accont } = React.useContext(AccontsContext)
    const { users } = React.useContext(AccontsContext)
    authService.organiza(accont)
    console.log(accont)
    console.log('users', users)

    
    return (
        <>
            {/* {accont} */}
            {users.body?.nameOrganization}
        </>
    )
}

