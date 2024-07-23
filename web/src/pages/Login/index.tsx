import logo from '../../assets/logo.svg';
import { Input } from '../../components/Input';
import './styles.css';

export function Login() {
  return (
    <main id="login-page">
      <header>
        <img src={logo} alt="Logo Beprepared" />
      </header>
      <form action="">
        <Input label="E-mail" name="email" type="email" />
        <Input label="Senha" name="password" type="password" />

        <a href="/">Esqueci a senha</a>
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
