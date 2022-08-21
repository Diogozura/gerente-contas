import React from 'react'
import { HttpClient } from '../infra/HttpClient/HttpClient';
import { tokenService } from '../services/auth/tokenService';

export const AccontsContext = React.createContext()
AccontsContext.displayName = 'Contas'

export default function AccontsProvider(ctx,{ children }) {
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
          }
            
          );
          console.log(data);
          setUsers(data);
        }
        fetchData(ctx);
      }, []);
    return (
        <AccontsContext.Provider value={{
            accont,
            setAccont,
            users
        }}>
            {children}
        </AccontsContext.Provider>
    )
}

