import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export default function SpacingGrid( {children}) {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
         {children}
        </Grid>
      </Grid>
     
    </Grid>
  );
}
