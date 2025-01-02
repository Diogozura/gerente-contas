import { useState } from "react";
import { useRouter } from "next/router";
import { Container, TextField, Button, Typography, Box, MenuItem } from "@mui/material";

interface User {
  nome: string;
  email: string;
  telefone: string;
  permissao: string;
}

export default function CreateUser() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    nome: "Usuário Fake",
    email: "usuario@exemplo.com",
    telefone: "(11) 99999-9999",
    permissao: "visualizar", // Default: "editar" ou "visualizar"
  });

  const handleChange = (field: keyof User, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem("dadosUsuarioLogado", JSON.stringify(user));
    alert("Dados do usuário salvos com sucesso!");
   
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Criar Dados do Usuário
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        noValidate
        sx={{ mt: 2 }}
      >
        <TextField
          label="Nome"
          value={user.nome}
          fullWidth
          onChange={(e) => handleChange("nome", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          value={user.email}
          fullWidth
          onChange={(e) => handleChange("email", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Telefone"
          value={user.telefone}
          fullWidth
          onChange={(e) => handleChange("telefone", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Permissão"
          value={user.permissao}
          fullWidth
          onChange={(e) => handleChange("permissao", e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="visualizar">Visualizar</MenuItem>
          <MenuItem value="editar">Editar</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" type="submit">
          Salvar Usuário
        </Button>
      </Box>
    </Container>
  );
}
