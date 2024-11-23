import { Paper, TextField } from "@mui/material";

export default function Filtro() {


  return (
    <>
     
        <Paper
          elevation={1}
          sx={{
            p: 3,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
           <TextField
              variant="outlined"
              id="outlined-basic"
            label="Filtro de visualização"
            //   disabled={editIndex !== index} // Somente habilitado no modo edição
            //   value={nomeLojas[index]}
            //   onChange={(event) => handleChange(event, index)}
              sx={{ width: "400px", 
              
                '& .MuiOutlinedInput-root': {
                borderRadius: '60px', // Aplica o borderRadius ao campo
                },  
             }}
            />
        </Paper>
     
    </>
  );
}
