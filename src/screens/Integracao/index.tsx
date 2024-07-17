import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Container } from "@mui/material";
import { authService } from "../../services/auth/authService";

export default function Pedido() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleIntegracaoClick = async () => {
    setLoading(true);
    setResponse(null);

    try {
     const integra = await authService.authIntegracaoML()
    console.log('integra', integra)

//       // Redirecionar o usuário para a página desejada
      router.push(integra.url);
    } catch (error) {
      setResponse(`Erro: ${error.message}`);
      
    } 
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Button
          variant="contained"
          onClick={handleIntegracaoClick}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Integração'}
        </Button>
        {response && (
          <pre style={{ marginTop: '20px', textAlign: 'left' }}>{response}</pre>
        )}
      </Container>
    </>
  );
}
