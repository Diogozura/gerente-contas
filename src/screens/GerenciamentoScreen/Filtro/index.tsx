import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Divider, FormControl, IconButton, InputAdornment, InputBase, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function Filtro() {


  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      console.log('Valor pesquisado:', searchValue); // Salva o valor no console
      // Aqui você pode chamar outra função ou processar o valor
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <>
     
        <Paper
          elevation={1}
          sx={{
            p: 3,
            mb: 2,
            borderRadius:'0px',
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
           <TextField
              variant="outlined"
              id="Filtro-por-nome"
            placeholder="Filtro de visualização"
            onKeyDown={handleKeyDown} // Chama a função ao pressionar uma tecla
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
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
