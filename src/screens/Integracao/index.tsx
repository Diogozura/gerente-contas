import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Container } from "@mui/material";
import { authService } from "../../services/auth/authService";
import { requireAuthentication } from "../../helpers/auth";
import Link from "next/link";

export const getServerSideProps = requireAuthentication(async (ctx) => {
  return {
    props: {}, // Props adicionais, se necessário
  };
});

const Pedido = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleIntegracaoClick = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const integra = await authService.authIntegracaoML();
      router.push(integra.url);
    } catch (error) {
      setResponse(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
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
       <Link href={'/dashboard'}>dash</Link>
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
  );
};

export default Pedido;
