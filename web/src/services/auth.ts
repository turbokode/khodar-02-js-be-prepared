import { postData } from './api';

export interface AdminProps {
  id: string;
  name: string;
  email: string;
}
export interface LoginResponseProps {
  token: string;
  admin: AdminProps;
}
export async function loginService(email: string, password: string): Promise<LoginResponseProps> {
  const response = await postData<LoginResponseProps>('/auth/admin', {
    email,
    password
  });

  return response;
}
