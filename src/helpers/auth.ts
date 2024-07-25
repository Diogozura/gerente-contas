import { withSession } from "../services/auth/session";

export const requireAuthentication = (getServerSidePropsFunc) => {
  return withSession(async (ctx) => {
    const session = ctx.req.session;

    if (!session) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }

    const props = await getServerSidePropsFunc(ctx);

    return {
      ...props,
      props: {
        ...props.props,
        session,
      },
    };
  });
};
