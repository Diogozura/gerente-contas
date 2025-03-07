import { withSession } from "@/services/auth/session";

export const requireAuthentication = (getServerSidePropsFunc) => {
  return withSession(async (ctx) => {
    const { token } = ctx.req; // Agora o token vem do NextAuth.js

    if (!token) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    const props = await getServerSidePropsFunc(ctx);

    return {
      ...props,
      props: {
        ...props.props,
      },
    };
  });
};
