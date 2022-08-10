
import React from "react";
import { authService } from "../../../services/auth/authService";




  
export default function Organizacoes(props, ctx) {
  const data = props.props.organizacoes
  const ultimo = data[data?.length - 1]
  // console.log(ultimo)
  const [values, setValues] = React.useState({
    idOrg: '',
  })
   
  authService.account(ctx, {values})
  const handlenChange = (event) => {
    
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    
    
        
    setValues((currenetValues) => {
      return {
        ...currenetValues,
        [fieldName]: fieldValue
      }
    })
      
  }



  // ultimo?.map((id) => {
  //     console.log(id.idOrganization)
  // })
  // const item = data.splice(1)
  // console.log('item', item)
  return (
    <>
      <h1> organização: {ultimo.nameOrganization}</h1>
      <h2>Função : {ultimo.nameRole}</h2>
      
      <ul>
        {data.map((orgs) => (
          <li key={orgs.idOrganization}>
            <input
               type="radio"
               id={orgs.idOrganization}
               name="idOrg"
              onChange={handlenChange}
               value={orgs.idOrganization}
            />
            <label htmlFor={orgs.idOrganization}>
            {orgs.nameOrganization}
            </label>
          </li>
        ))}
                {/* {data.map((org) => (
                    <li key={org.idOrganization}>
                        <input 
                            type="radio"
                            id={org.idOrganization}
                            name="idOrg"
                            onChange={handlenChange}
                            value={org.nameOrganization} />

                        <label htmlFor={org.idOrganization}
                        {org.nameOrganization}
                        </label>
                            
                     </li>
                
         )} */}

            </ul>
               
            <pre> {JSON.stringify(values , null, 2)}</pre> 


    </>
       
  )
}

