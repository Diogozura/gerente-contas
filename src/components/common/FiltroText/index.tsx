import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface FiltroTextoProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const FiltroTexto: React.FC<FiltroTextoProps> = ({ label, value, onChange }) => {
  return (
    <TextField
    //   label={}
      variant="outlined"
      id="outlined-basic"
      placeholder={label}
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      sx={{ width: "400px", 
              
        '& .MuiOutlinedInput-root': {
        borderRadius: '60px', // Aplica o borderRadius ao campo
        },  
     }}
     InputProps={{
        startAdornment: (
          <InputAdornment position="start">
           
            <SearchIcon />
            
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FiltroTexto;
