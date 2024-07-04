import { Box, Typography } from "@mui/material";

export default function HubeefivePlano({price}){
    return(
        <>
    
        <Box sx={{
                   position: 'absolute',
                   top: -5,
                   right: -15,
                   backgroundColor: '#9333ea',
                   color: '#fff',
                   padding: '0.5rem 1rem',
                   borderRadius: '10px',
        }}>
               
                <Typography>R${price}</Typography>
            </Box>
            <Typography color={'primary'} variant="h3" component={'h2'}>Hubeefive</Typography>
            <Typography color={'inherit'}>Plano Mensal</Typography>

           
      
        </>
    )
}