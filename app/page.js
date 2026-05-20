"use client"

import Link from "next/link";
import { useLogin } from "./componentes/custom-hooks/useLogin";

export default function Home() {
  const { login, handleState, fetchLogin } = useLogin()
  return (
    <div>
      <div id="main-content" className="card-form">
        <form>
          <h2>Login</h2>
          <div className="form-group">
            <input type="email" id="correio" placeholder="Digite seu email" className="form-control" name="email" value={login.email} onChange={handleState} />
          </div>
          <div className="form-group">
            <input type="password" id="senha" placeholder="Digite sua senha" className="form-control" name="password" value={login.password} onChange={handleState} />
          </div>
          <button id="login" className="btn btn-connect" type="button" onClick={fetchLogin}>Entrar</button>
        </form>
        <div className="form-group">
          <Link href="/cadastro" id="linkCadastro">Não tem uma conta? Inscreva-se</Link>
        </div>
      </div>
    </div>
  );
}
