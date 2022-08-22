import React from 'react'
import { HttpClient } from '../infra/HttpClient/HttpClient';
import { tokenService } from '../services/auth/tokenService';

interface Acconts {
    accont: string,
    users:string
}

export const AccontsContext = React.createContext()
AccontsContext.displayName = 'Contas'

export default function AccontsProvider({ children, ctx }) {
    const [accont, setAccont] = React.useState('')
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        async function fetchData(ctx) {
            const token = tokenService.get(ctx);
            const data = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orgatization?idOrganization=${accont || 2}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((response) => {
                console.log('response', response.body.accounts)
                // if (!response.ok) throw new Error('Não autorizado');
                // console.log(accont)
                return response.body;
              });
        //   console.log('data', data);
          setUsers(data);
        }
        fetchData(ctx);
    }, [accont]);
    
    // console.log(accont , users)
    return (
        <AccontsContext.Provider value={{
            accont,
            setAccont,
            users,
            setUsers
        }}>
            {children}
        </AccontsContext.Provider>
    )
}

