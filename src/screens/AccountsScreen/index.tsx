
 function Accounts(props) {
  console.log(props.props.accounts)
     return (
         <>
             <h1>Suas Contas </h1>
         {props.props.accounts.map((name) => (
           <>
              <p>{name.nameAccount}</p>
           </>
          
         )
           
                // console.log(name.nameAccount) 
             
                 
         )}
         <br/>
         {JSON.stringify(props.acconts , null, 2)}
        </>
        

    )
}

export default Accounts