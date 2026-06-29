"use client"

import Link from "next/link";
import { useLogin } from "./componentes/custom-hooks/useLogin";
import { useVisibility } from "./componentes/custom-hooks/useVisibility";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Home() {
  const { login, handleState, fetchLogin, enter } = useLogin()
  const { visibility, handleVisibility } = useVisibility()
  return (
    <div>
      <div id="main-content" className="card-form">
        <form>
          <h2>Login</h2>
          <div className="form-group">
            <input type="email" id="correio" placeholder="Digite seu email" className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10" name="email" value={login.email} onChange={handleState} />
          </div>
          <div className="form-group relative w-full">


            <input type={visibility ? "text" : "password"} id="senha" placeholder="Digite sua senha" className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10" name="password" onKeyDown={enter} value={login.password} onChange={handleState} />

            <button className="absolute top-1/2 -translate-y-1/2 right-3" onClick={handleVisibility}>{visibility ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />
            }</button>
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
