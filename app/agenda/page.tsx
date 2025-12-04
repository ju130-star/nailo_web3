"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import CalendarMini from "@/app/components/CalendarMini";
import CalendarioCentral from "@/app/components/CalendarioCentral";


export default function AgendaPage() {
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);

  const clientes = [
  { id: 1, nome: "Anny", foto: "/img/mulher1.png" },
  { id: 2, nome: "Bianca", foto: "/img/mulher2.png" },
  { id: 3, nome: "Alessandra", foto: "/img/mulher3.png" }
];

  // CALENDÁRIO (somente exemplo)
  const diasMes = Array.from({ length: 31 }, (_, i) => i + 1);

  const horarios = [
    "08:00","09:00","10:00","11:00",
    "12:00","13:00","14:00","15:00",
    "16:00","17:00"
  ];

  return (
    <div className="agenda-container">

    {/* -------------------- HEADER IGUAL AO DA AGENDA -------------------- */}
      <header className="header">
        <div className="header-left">
          <img
            src="/img/Nailo1.png"
            alt="Logo"
            width={60}
            height={60}
            className="logo-home"
          />
        </div>

        <nav className="menu-right">
          <a href="/home">Home</a>
          <a href="/agenda">Agenda</a>
          <a href="/financas">Finanças</a>
          <a href="/">Sair</a>
          <a href="/perfil" className="profile-icon">
          <User size={28} />
          </a>
        </nav>
      </header>

      {/* ------------------- LAYOUT PRINCIPAL ------------------- */}
      <div className="main-content">
<div className="layout-agenda">

  {/* ----------- LISTA DE CLIENTES ----------- */}
  <aside className="clientes-box">
    {clientes.map(cli => (
      <div 
        key={cli.id} 
        className="cliente-item"
        onClick={() => setClienteSelecionado(cli)}
      >
        <div className="cliente-foto">
          <Image src={cli.foto} width={60} height={60} alt="foto cliente" />
        </div>
        <span className="cliente-nome">{cli.nome}</span>
      </div>
    ))}
  </aside>

  <div className="cliente-info-box">
    {clienteSelecionado ? (
      <>
        <h2 className="cliente-info-nome">{clienteSelecionado.nome}</h2>
        <Image 
          src={clienteSelecionado.foto} 
          width={100} 
          height={100} 
          alt="foto cliente" 
          className="cliente-info-foto"
        />
        <p><strong>Telefone:</strong> {clienteSelecionado.telefone}</p>
        <p><strong>Email:</strong> {clienteSelecionado.email}</p>
        <p><strong>Último serviço:</strong> {clienteSelecionado.ultimoServico}</p>
      </>
    ) : (
      <p className="cliente-info-placeholder">Selecione um cliente</p>
    )}
  </div>

</div>



        {/* ----------- CALENDÁRIO CENTRAL ----------- */}
  
    <main className="calendario-central">
      <CalendarioCentral />
    </main>

        {/* ----------- MINI CALENDÁRIO ----------- */}
      <aside className="mini-calendar">
  <CalendarMini />
</aside>


      </div>

    </div>
  );
}
