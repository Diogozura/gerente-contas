// pages/api/redirect.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '../../src/services/auth/authService';
import nookies from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;
  const ctx = { req, res };

  const cookies = nookies.get(ctx);
  let token = cookies['ACCESS_TOKEN_KEY'];

  if (!code) {
    return res.status(400).json({ error: 'Code não fornecido' });
  }

  try {
    const resposta = await authService.authRetornoML({ code, token });
    console.log('resposta', resposta)
    if (resposta.status === 201) {
      // Redirecionar o usuário para a página desejada
      res.writeHead(302, { Location: '/integracao/minhas-integracoes' });
      res.end();
      return;
    }
  } finally {
    // Redirecionar o usuário independentemente do resultado
    res.writeHead(302, { Location: '/integracao/minhas-integracoes' });
    res.end();
  }
}
