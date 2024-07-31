import { postData } from './api';

interface LoginResponseProps {
  token: string;
  admin: {
    id: string;
    name: string;
    email: string;
  };
}
export async function login(email: string, password: string): Promise<LoginResponseProps> {
  const response = await postData<LoginResponseProps>('/auth/admin', {
    email,
    password
  });

  return response;
}
