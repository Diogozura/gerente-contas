// pages/api/redirect.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '../../src/services/auth/authService';
import nookies from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;
  const ctx = { req, res }

  const cookies = nookies.get(ctx);
  let token = cookies['ACCESS_TOKEN_KEY'];

  if (!code || !state) {
    return res.status(400).json({ error: 'Code ou state não fornecido' });
  }

  try {
    // Faça o que for necessário com os parâmetros `code` e `state`
    // Por exemplo, você pode fazer uma chamada a outro serviço, salvar no banco de dados, etc.
    const resposta = await authService.authRetornoML({ code, token });

    if (resposta.status === 200) {
      // Redirecionar o usuário para a página desejada
      res.writeHead(302, { Location: '/integracao/minhas-integracoes' });
      res.end();
      return;
    }

    

    // Aqui está um exemplo simples de uma resposta de sucesso
    res.status(200).json({
      success: true,
      message: 'Parâmetros recebidos com sucesso',
      code,
      state
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
