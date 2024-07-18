// pages/api/ml.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Code não fornecido' });
  }

  try {
    // Aqui você faz a chamada para o outro endpoint
    const response = await fetch(`https://outro-endpoint.com/api?param=${code}`, {
      method: 'GET', // ou 'POST', 'PUT', etc. dependendo do método do outro endpoint
      headers: {
        'Content-Type': 'application/json',
        // outros headers se necessário
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao chamar o endpoint: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json({
      success: true,
      message: 'Chamada ao endpoint bem-sucedida',
      data,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
