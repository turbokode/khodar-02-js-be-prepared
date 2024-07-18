import logo from '../../assets/logo.svg';

export function Login() {
  return (
    <div id="login-page">
      <main>
        <img src={logo} alt="Logo Beprepared" />
        <form action="">
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" placeholder="example@beprepared.com" />

          <label htmlFor="password">Senha</label>
          <input type="password" name="password" />

          <button type="button">Esqueci a senha</button>
          <button type="submit">Entrar</button>
        </form>
      </main>
    </div>
  );
}
