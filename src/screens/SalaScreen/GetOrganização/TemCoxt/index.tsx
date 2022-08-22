import React from "react"
import styled from "styled-components"
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
            <Table>
            <tr>
                <Value>Name</Value>
                <Value>Name Role</Value>
                <Value>Total</Value>
                </tr>
              
                    {users.accounts?.map((value) => (
                        <tr key={value.idAccount}>
                            <Items >{value.nameAccount }</Items>
                            <Items >{value.nameRole }</Items>
                            <Items >{value.total }</Items>
                        </tr>
                        
                    ))}
              
                
            </Table>
            {/* {accont} */}
            {users.body?.accounts}
        </>
    )
}

const Table = styled.table`
     font-family: arial, sans-serif;
     border-collapse: collapse;
    width: 100%;
`
const Value = styled.th`
     border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`
const Items = styled.td`
     border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`


// {
//     "accounts": [
//         {
//             "idAccount": 9,
//             "nameAccount": "testeACC1",
//             "nameRole": "Proprietário",
//             "total": 0.0
//         },

//     ]
// }