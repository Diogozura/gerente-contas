import React from "react";



  
export default function Organizacoes(props) {
    const data = props.props.organizacoes
    return (
        <>
            <h1>Nome da organização </h1>
            <ol>
                {data?.map((org) => (
                    <>
                        <li key={org.idOrganization}>{org.nameOrganization}</li>
                        <li>{ org.nameRole}</li>
                    </>
                    
                )
                )}
            </ol>
        <pre>
        {JSON.stringify(props.props, null, 2)}
        </pre> 
        </>
       
    )
}
