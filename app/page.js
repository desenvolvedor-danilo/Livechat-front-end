"use client"

import Link from "next/link";
import { useLogin } from "./componentes/custom-hooks/useLogin";
import { useVisibility } from "./componentes/custom-hooks/useVisibility";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Home() {
  const { login, handleState, fetchLogin, enter, error } = useLogin()
  const { visibility, handleVisibility } = useVisibility()
  return (
    <>
      <div id="main-container" className="card-form container mx-auto px-4">
        <form>
          <h2 className="text-[1.5em]">Login</h2>
          <div className="form-group">
            <input type="email" id="correio" placeholder="Digite seu email" className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10" name="email" value={login.email} onChange={handleState} />
          </div>
          <div className="form-group relative w-full">


            <input type={visibility ? "text" : "password"} id="senha" placeholder="Digite sua senha" className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10" name="password" onKeyDown={enter} value={login.password} onChange={handleState} />

            <button type="button" className="absolute top-1/2 -translate-y-1/2 right-3" onClick={handleVisibility}>{visibility ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />
            }</button>
          </div>
          {error &&
            <aside className="text-center mt-[-10px] p-[5px]" ><h5 className="text-base text-[#4a4ee0] font-black">{error}</h5></aside>
          }
          <button id="login" className="btn btn-connect" type="button" onClick={fetchLogin}>Entrar</button>
        </form>
        <div className="text-center form-group text-[#4a4ee0] ">
          <Link className="text-xl font-black" href="/cadastro">Não tem uma conta? Inscreva-se</Link>
        </div>
      </div>
    </>
  );
}
