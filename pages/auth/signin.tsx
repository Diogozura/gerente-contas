// pages/auth/signin.tsx
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    // Se o usuário estiver autenticado, redirecione-o para a página autenticada
    if (session) {
      router.push('/sala');
    }
  }, [router, session]);

  const handleSignIn = () => {
    signIn();
  };

  return (
    <>
      <div>Not signed in</div>
      <button onClick={handleSignIn}>Sign in</button>
    </>
  );
}
