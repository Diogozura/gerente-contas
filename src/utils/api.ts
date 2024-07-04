import endpoints from './endpoints';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export async function apiPadrao(
  endpointName: string,
  method: HttpMethod,
  body?: any,
  headers?: HeadersInit
) {
  const endpointPath = endpoints[endpointName]?.[method];

  if (!endpointPath) {
    throw new Error(`Endpoint or method not found for: ${endpointName} ${method}`);
  }

  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  if (!backendUrl) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
  }

  const url = endpointPath.includes(':id') && body?.id
    ? backendUrl + endpointPath.replace(':id', body.id)
    : backendUrl + endpointPath;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
