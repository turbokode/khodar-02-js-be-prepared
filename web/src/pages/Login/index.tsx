import { FormEvent, FormEventHandler, useState } from 'react';
import logo from '../../assets/logo.svg';
import { Input } from '../../components/Input';
import './styles.css';
import { api, postData } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

interface LoginResponseProps {
  token: string;
  admin: {
    id: string;
    name: string;
    email: string;
  };
}

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmitLogin(e: FormEvent) {
    e.preventDefault();
    postData<LoginResponseProps>('/auth/admin', {
      email,
      password
    })
      .then((response) => {
        api.defaults.headers.Authorization = `Bearer ${response.token}`;
        navigate('/dashboard');
      })
      .catch((error) => {
        alert('Falha na autenticacao');
      });
  }

  return (
    <main id="login-page">
      <header>
        <img src={logo} alt="Logo Beprepared" />
      </header>
      <form action="" onSubmit={handleSubmitLogin}>
        <Input label="E-mail" name="email" type="email" onChange={(e) => setEmail(e.target.value)} />
        <Input label="Senha" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />

        <a href="/">Esqueci a senha</a>
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
