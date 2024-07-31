import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export async function fetchData<T = unknown>(url: string): Promise<T> {
  const response = await api.get(url);
  return response.data;
}

export async function postData<T = unknown>(url: string, data: unknown): Promise<T> {
  const response = await api.post(url, data);
  return response.data;
}
