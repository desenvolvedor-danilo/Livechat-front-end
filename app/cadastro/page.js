'use client'

import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useRegister } from "../componentes/custom-hooks/useRegister"
import { useVisibility } from "../componentes/custom-hooks/useVisibility"
import ErrorUI from "../componentes/ui/ErrorUI"

export default function Cadastro() {
  const { user, handleState, handleSubmit, error } = useRegister()

  const { visibility, handleVisibility } = useVisibility()
  console.log(user.nome)
  return (
    <>
      <div id="main-content" className="card-form container mx-auto px-4">


        <form>
          <h2>Cadastro</h2>
          <ErrorUI message={error} />
          <div className="form-group">
            <input type="text" id="name" name="nome" value={user.nome} placeholder="Digite o nome que será exibido na tela" className="form-control" onChange={handleState} />
          </div>
          <div className="form-group" id="container-email">
            <input type="email" id="email" name="email" value={user.email} placeholder="Digite seu email" className="form-control" onChange={handleState} />
          </div>

          <div className="form-group relative w-full">
            <div className="form-group">
              <input type={visibility ? "text" : "password"} name="password" id="password" placeholder="Digite sua senha" value={user.password} className="form-control" onChange={handleState} />


              <button type="button" className="absolute top-1/2 -translate-y-1/2 right-3" onClick={handleVisibility}>{visibility ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />
              }</button>
            </div>
          </div>

          <div className="form-group">
            <input type="text" id="usuario" name="username" placeholder="Digite seu usuário" value={user.username} className="form-control" onChange={handleState} />
          </div>
          <button type="button" id="cadastro" className="btn btn-connect" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </>
  )
}
