import { useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { requireAuthentication } from "../../helpers/auth";


export const getServerSideProps = requireAuthentication(async (ctx) => {
  return {
    props: {}, // Props adicionais, se necessário
  };
});

export default function Pedido() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleIntegracaoClick = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/ml?code=kdlsandolandlkasklda', {
        method: 'GET', // ou 'POST', 'PUT', etc. dependendo do método do endpoint
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Erro ao chamar o endpoint: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
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
        <Grid>
            <Typography variant="h3" component={'h1'}>Minhas integrações</Typography> 
        </Grid>
        {/* <Button
          variant="contained"
          onClick={handleIntegracaoClick}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Integração'}
        </Button>
        {response && (
          <pre style={{ marginTop: '20px', textAlign: 'left' }}>{response}</pre>
        )} */}
      </Container>
    </>
  );
}
