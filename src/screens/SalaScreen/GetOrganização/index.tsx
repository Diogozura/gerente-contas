import { Box, Button, ButtonGroup, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import { AccontsContext } from "../../../common/counts";
import TemCoxt from "./TemCoxt";

export default function Organizacoes(props) {

    // idOrganization
    const {  setAccont } = React.useContext(AccontsContext)
  
    return (
        <>
            <Typography variant="h6" noWrap>Organização</Typography>
            {/* <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
                {props.props.organizacoes?.map((org) => (
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" key={org.idOrganization}>
                        <Button onClick={()=> setAccont(org.idOrganization)}>{ org.nameOrganization}</Button>
                        
                    </ButtonGroup>
                    
                )
                )}

            </Box> */}
           
        {/* <pre>
        {JSON.stringify(props.props, null, 2)}
        </pre>  */}

<List>
        {props.props.organizacoes?.map((value, index) => (
          <ListItem key={value.idOrganization} disablePadding>
            <ListItemButton>
              
              <ListItemText onClick={()=> setAccont(value.idOrganization)} primary={value.nameOrganization} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
        </>
       
    )
}
