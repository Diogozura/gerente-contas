import { Button } from "@mui/material";
import React from "react";
import { AccontsContext } from "../../../common/counts";
import TemCoxt from "./TemCoxt";

export default function Organizacoes(props) {

    // idOrganization
  

    return (
        <>
            <h1>Nome da organização</h1>
            <ul>
                {props.props.organizacoes?.map((org) => (
                    <>
                        <Button >{ org.nameOrganization}</Button>
                        <li>{org.nameRole}</li>
                        
                    </>
                    
                )
                )}

            </ul>
             {/* <TemCoxt/> */}
        <pre>
        {JSON.stringify(props.props, null, 2)}
        </pre> 
        </>
       
    )
}
