
import nookies from 'nookies';

export const isAuthenticated = () => {
  const cookies = nookies.get();
  return !!cookies['ACCESS_TOKEN_KEY'];
};
