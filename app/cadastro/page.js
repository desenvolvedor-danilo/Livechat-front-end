'use client'

import { useRegister } from "../componentes/custom-hooks/useRegister"

export default function Cadastro() {
  const { user, handleState, handleSubmit } = useRegister()
  console.log(user.nome)
  return (
    <>
      <div id="main-content" className="card-form">
        <form>
          <h2>Cadastro</h2>

          <div className="form-group">
            <input type="text" id="name" name="nome" value={user.nome} placeholder="Digite o nome que será exibido na tela" className="form-control" onChange={handleState} />
          </div>
          <div className="form-group" id="container-email">
            <input type="email" id="email" name="email" value={user.email} placeholder="Digite seu email" className="form-control" onChange={handleState} />
          </div>
          <div className="form-group">
            <input type="password" name="password" id="password" placeholder="Digite sua senha" value={user.password} className="form-control" onChange={handleState} />
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
