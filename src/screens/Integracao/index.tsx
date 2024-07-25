import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Container } from "@mui/material";
import { authService } from "../../services/auth/authService";
import { requireAuthentication } from "../../helpers/auth";
import Link from "next/link";
import { tokenService } from "../../services/auth/tokenService";

export const getServerSideProps = requireAuthentication(async (ctx) => {
  const token = ctx.req.token;
  try {
    const dadosSala = await authService.authIntegracaoML(token);

    return {
      props: {
        dadosSala,
      },
    };
  } catch (error) {
    return {
      redirect: {
      
        permanent: true,
      },
    };
  }
});

const Pedido = (ctx) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const handleClick = async () => {
  router.push('/integracao/integra')
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
      <Link href="/dashboard">dash</Link>
      <Button variant="contained" onClick={handleClick} disabled={loading}>
        {loading ? 'Enviando...' : 'Integração'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </Container>
  );
};

export default Pedido;
