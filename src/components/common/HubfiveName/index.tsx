import { Box, Typography } from "@mui/material";

export default function TituloHub(){
    return(
        <Box component={'span'} display={'flex'} justifyContent='center'>  
        <Typography variant="h3" component={'h2'} fontWeight={'500'} color={'primary'}>Hubee</Typography>
        <Typography variant="h3" component={'h2'} fontWeight={'bold'} color={'primary'}>Five</Typography>
        </Box>
    )
}