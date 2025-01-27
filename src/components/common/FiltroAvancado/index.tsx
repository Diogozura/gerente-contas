import React from "react";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

interface FiltroAvancadoProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const FiltroAvancado: React.FC<FiltroAvancadoProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FilterAltOutlinedIcon />
          </InputAdornment>
        ),
      }}
      sx={{ width: "400px", 
              
        '& .MuiOutlinedInput-root': {
        borderRadius: '60px', // Aplica o borderRadius ao campo
        },  
     }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FiltroAvancado;
