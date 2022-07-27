import React from "react";



  
export default function Organizacoes(props) {
 
    return (
        <>
            <h1>Nome da organização</h1>
            <ul>
                {props.props.organizacoes?.map((org) => (
                    <>
                        <li>{ org.nameOrganization}</li>
                         <li>{ org.nameRole}</li>
                    </>
                    
                )
                )}
            </ul>
        <pre>
        {JSON.stringify(props.props, null, 2)}
        </pre> 
        </>
       
    )
}
