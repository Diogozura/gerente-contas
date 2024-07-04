import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment;
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { maskCPF, maskPhone } from '../../../../utils/mask';
import { InputAdornment } from '@mui/material';

interface CustomInputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'cpf' | 'cnpj';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, type, value, onChange, error, helperText }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMaskedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let maskedValue = value;

    if (type === 'tel') {
      maskedValue = maskPhone(value);
    } else if (type === 'cpf') {
      maskedValue = maskCPF(value);
    }

    onChange({
      ...event,
      target: {
        ...event.target,
        value: maskedValue,
      },
    });
  };

  return (
    <TextField
      label={label}
      type={type === 'password' && !showPassword ? 'password' : 'text'}
      value={value}
      onChange={type === 'tel' || type === 'cpf' ? handleMaskedChange : onChange}
      variant="standard"
      fullWidth
      margin="normal"
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: type === 'password' && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomInput;
