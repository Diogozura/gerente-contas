// import * as React from 'react';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';


// export default function SpacingGrid( {children}) {
//   const [spacing, setSpacing] = React.useState(2);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSpacing(Number((event.target as HTMLInputElement).value));
//   };

//   const jsx = `
// <Grid container spacing={${spacing}}>
// `;

//   return (
//     <Grid sx={{ flexGrow: 1 }} container spacing={2}>
//       <Grid item xs={12}>
//         <Grid container justifyContent="center" spacing={spacing}>
//          {children}
//         </Grid>
//       </Grid>
     
//     </Grid>
//   );
// }
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useRouter } from 'next/router';

export default function CardsPlano({plano, preco, descricao}) {
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: '/pay/pedido',
      query: { plano, preco }, // Adicione a query string com o ID
    });
  };


  return (
    <>

    <Card sx={{ maxWidth: 500, m:2 , padding:'0px 20px', 
      // borderStyle:'groove', 
      borderRadius:5}}  >
      <CardContent>
      <Typography variant="h5"  fontWeight={'bold'}  color="primary" component="h2">
          Plano  {plano} 
          {/* || Meses {timePlano} */}
          </Typography>
          <Typography variant="h4" fontWeight={'bold'} mb={5} color="primary">
          R${preco}
          </Typography>
          {Array.isArray(descricao) ? (
          <ul>
            {descricao.map((item, index) => (
              <li key={index}>
                <Typography variant="body1" color="text.secondary">
                  {item.descricao}
                </Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {descricao}
          </Typography>
        )}

      </CardContent>
      <CardActions sx={{justifyContent: 'space-around'}}>
      <Button 
      size="large" 
      variant='contained'
      onClick={handleClick}
      
      sx={{
      textTransform: 'uppercase',
      background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
      color: 'white',
      '&:hover': {
        background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
      },
    }} 
    
          >
         comprar
        </Button>
      </CardActions>
    </Card>
    </>
    

    
  );
}
