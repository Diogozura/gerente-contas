// pages/auth/signin.tsx
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignIn(ctx) {
  const { data: session } = useSession(ctx);

  if (session) {
    return (
      <>
        <div>Signed in as {session.user.email}</div>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <div>Not signed in</div>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
