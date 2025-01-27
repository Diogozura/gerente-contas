import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import Head from "next/head";
import PerfilForm from "@/components/forms/PerfilForm";
import { useFormContext } from "@/config/FormContext";
import { UsuarioLogado } from "@/types/usuarioLogado";

interface User {
  nome: string;
  email: string;
  telefone: string;
  permissao: string;
}

export default function CreateUser() {
  const router = useRouter();
  const { formValues, setFormValues } = useFormContext();
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
useEffect(()=>{
  const savedData = localStorage.getItem("dadosUsuarioLogado");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormValues("dadosUsuarioLogado", parsedData); // Atualiza o contexto globa
      setFormValues('infoDados', { 'telefone': parsedData?.telefone });
   console.log('parsedData', parsedData)
  }
    
   
  
 
},[])


  const handleSubmit = () => {
    localStorage.setItem("dadosUsuarioLogado", JSON.stringify(formValues.dadosUsuarioLogado));
    alert("Dados do usuário salvos com sucesso!");

  };

  return (
    <>
      <Head>
        <title>Hubeefive - Perfil</title>
      </Head>
      <Container>
        <Typography variant="h4" gutterBottom>
          Dados do usuario logado
        </Typography>

        <PerfilForm view={false}/>
       
      
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
            Salvar Usuário
          </Button>
      </Container>
    </>
  );
}
