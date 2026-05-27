// "use client"
// import Image from "next/image";
// import Link from "next/link";
//
// export default function NavBar() {
//   return (
//     <>
//       <h2><Image src="/favicon.png" width="150" height="80" alt="name application" /></h2>
//       <nav className="bg-[#4a4ee0] text-white w-full" id="nav">
//         <div className="flex items-center justify-between px-4 py-3">
//
//           <a className="navbar-brand text-white" id="name" href="#"></a>
//           <button className="md:hidden flex flex-col gap-1" type="button" data-bs-toggle="collapse"
//             data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
//             aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon text-white"></span>
//           </button>
//           <div className="collapse navbar-collapse text-white" id="navbarNavAltMarkup">
//             <div className="navbar-nav">
//
//               <Link className="nav-link" href="/notifications">Notificações</Link>
//               <Link className="nav-link" href="/contacts">Contatos</Link>
//               <Link className="nav-link" href="/configuration">Configurações</Link>
//               <a className="nav-link" id="logout">Logout</a>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#4a4ee0] text-white w-full">
      <div className="flex items-center justify-between px-4 py-3">

        {/* Brand */}
        <a className="font-semibold mx-auto" href="#">
          <Image src="/favicon.png" width="150" height="80" alt="name application" />
        </a>

        {/* Botão hamburguer (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-6">
          <Link href="/notifications">Notificações</Link>
          <Link href="/contacts">Contatos</Link>
          <Link href="/configuration">Configurações</Link>
          <a href="#" className="text-white">
            Logout
          </a>
        </div>
      </div>

      {/* Menu mobile (collapse) */}
      <div
        className={`md:hidden flex flex-col gap-3 px-4 pb-3 transition-all duration-300 overflow-hidden ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <Link href="/notifications">Notificações</Link>
        <Link href="/contacts">Contatos</Link>
        <Link href="/configuration">Configurações</Link>
        <a href="#">Logout</a>
      </div>
    </nav>
  );
}
