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

  console.log()
  return (
    <>

    <Card sx={{ maxWidth: 345, m:2 }} >
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
          Plano  {plano} 
          {/* || Meses {timePlano} */}
          </Typography>
          <Typography variant="h4" fontWeight={'bold'}  color="primary">
          R${preco}
          </Typography>
          {Array.isArray(descricao) ? (
          <ul>
            {descricao.map((item, index) => (
              <li key={index}>
                <Typography variant="body2" color="text.secondary">
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
      <CardActions>
      <Button 
      size="large" 
      variant='contained'
      onClick={handleClick}
      fullWidth
      sx={{
      textTransform: 'uppercase',
    }} 
      color="primary"
          
          >
         comprar
        </Button>
      </CardActions>
    </Card>
    </>
    

    
  );
}
