"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "../functions/logout";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#4a4ee0] text-white w-full">
      <div className="flex items-center justify-between px-4 py-3">

        {/* Brand */}
        <a className="font-semibold mx-auto" href="/notifications">
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
          <a onClick={logout} className="text-white">
            Logout
          </a>
        </div>
      </div>

      {/* Menu mobile (collapse) */}
      <div
        className={`md:hidden flex flex-col gap-3 px-4 pb-3 transition-all duration-700 overflow-hidden ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <Link className="hover:scale-120" href="/notifications">Notificações</Link>
        <Link className="hover:scale-120" href="/contacts">Contatos</Link>
        <Link className="hover:scale-120" href="/configuration">Configurações</Link>
        <a className="hover:scale-120" href="#">Logout</a>
      </div>
    </nav>
  );
}
