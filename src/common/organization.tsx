import React from 'react'

export const OrganizationContext = React.createContext()
OrganizationContext.displayName = 'Contas'

export default function AccontsProvider({children}) {
    const [org, setOrg] = React.useState('')
    return (
        <OrganizationContext.Provider value={{
            org,
            setOrg
        }}
        >
            {children}
        </OrganizationContext.Provider>
    )
}