import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <h2><Image src="/favicon.png" width="150" height="80" alt="name application" /></h2>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent text-dark" id="nav">
        <div className="container-fluid">

          <a className="navbar-brand text-white" id="name" href="#"></a>
          <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon text-white"></span>
          </button>
          <div className="collapse navbar-collapse text-white" id="navbarNavAltMarkup">
            <div className="navbar-nav">

              <Link className="nav-link" href="/notifications">Notificações</Link>
              <Link className="nav-link" href="/contacts">Contatos</Link>
              <Link className="nav-link" href="/configuration">Configurações</Link>
              <a className="nav-link" id="logout">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
