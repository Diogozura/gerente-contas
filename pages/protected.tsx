// pages/protected.tsx
import { getSession } from 'next-auth/react';

export default function ProtectedPage({ session }) {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>This page is protected and can only be accessed by authenticated users.</p>
      <p>Logged in as {session.user.email}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}
