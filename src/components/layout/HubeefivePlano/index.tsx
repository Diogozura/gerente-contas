import { Box, Typography } from "@mui/material";

export default function HubeefivePlano({price}){
    return(
        <>
    
        <Box sx={{
                   position: 'absolute',
                   top: 40,
                   right: -55,
                   backgroundColor: '#703B8C',
                   color: '#fff',
                   padding: '0.5rem 1rem',
                   borderRadius: '10px',
        }}>
               
                <Typography variant="h5">R${price}</Typography>
            </Box>
            <Typography color={'primary'} variant="h4" fontWeight={'500'} component={'h2'}>Hubeefive</Typography>
      
        </>
    )
}