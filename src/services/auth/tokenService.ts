import nookies from 'nookies';
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
const ACCESS_TOKEN_PAY = 'ACCESS_TOKEN_PAY';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_NAME'; // Novo chave para o refresh token

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
// const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  save(accessToken: string, ctx = null) {
    console.log('acss', accessToken)
    nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: ONE_DAY * 7,
      path: '/',
    });
  },
  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || '';
    // return globalThis?.localStorage?.getItem(ACCESS_TOKEN_KEY);
    // return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken(ctx = null) { // Função para obter o refresh token
    const cookies = nookies.get(ctx);
    return cookies[REFRESH_TOKEN_KEY] || '';
  },
  delete(ctx = null) {
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  },
  savePay(accessToken: string, ctx = null) {
    nookies.set(ctx, ACCESS_TOKEN_PAY, accessToken, {
      maxAge: ONE_MINUTE * 10,
      path: '/',
    });
  },

  getPay(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_PAY] || '';
    // return globalThis?.localStorage?.getItem(ACCESS_TOKEN_KEY);
    // return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }
}
