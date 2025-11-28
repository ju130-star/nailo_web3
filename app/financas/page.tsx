"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { User } from "lucide-react";
import { useMemo, useState } from "react";

// ------------------------------------------------------
// TIPOS
// ------------------------------------------------------
interface IAtendimento {
  id: string;
  data: Date | string;
  horario: string;
  servico: string;
  cliente: string;
  valor: number;
  pago: boolean;
  status: "concluido" | "cancelado" | "pendente";
}

// ------------------------------------------------------
// DADOS MOCKADOS
// ------------------------------------------------------
const atendimentosIniciais: IAtendimento[] = [
  {
    id: "1",
    data: new Date("2025-09-17"),
    horario: "16:30 - 18:00",
    servico: "Unha em gel",
    cliente: "Cleide Barros",
    valor: 80.0,
    pago: false,
    status: "cancelado",
  },
  {
    id: "2",
    data: new Date("2025-09-18"),
    horario: "09:00 - 10:30",
    servico: "Manicure completa",
    cliente: "Julia Freitas",
    valor: 40.0,
    pago: true,
    status: "concluido",
  },
  {
    id: "3",
    data: new Date("2025-09-18"),
    horario: "11:00 - 12:30",
    servico: "Alongamento fibra de vidro",
    cliente: "Raissa Lima",
    valor: 120.0,
    pago: false,
    status: "pendente",
  },
  {
    id: "4",
    data: new Date("2025-09-19"),
    horario: "14:00 - 15:30",
    servico: "Manutenção fibra",
    cliente: "Beatriz Rocha",
    valor: 70.0,
    pago: true,
    status: "concluido",
  },
];

// ------------------------------------------------------
// CARD DO ATENDIMENTO
// ------------------------------------------------------
const AtendimentoCard = ({ atendimento }: { atendimento: IAtendimento }) => {
  let statusClass = "";

  if (atendimento.status === "concluido") statusClass = "card-concluido";
  if (atendimento.status === "cancelado") statusClass = "card-cancelado";
  if (atendimento.status === "pendente") statusClass = "card-pendente";

  const dataFormatada = new Date(atendimento.data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className={`atendimento-card ${statusClass}`}>
      <p>
        <strong>{dataFormatada}</strong> | {atendimento.horario}
      </p>
      <p>- {atendimento.servico} - {atendimento.cliente}</p>
      <span className="card-icone-pessoa">👤</span>
    </div>
  );
};

// ------------------------------------------------------
// PÁGINA FINANÇAS — AGORA COM O MESMO HEADER + LAYOUT
// ------------------------------------------------------
export default function FinancePage() {
  const router = useRouter();
  const [atendimentos] = useState(atendimentosIniciais);

  const clientesAtendidos = useMemo(() => {
    return atendimentos.filter((a) => a.status === "concluido").length;
  }, [atendimentos]);

  const saldoTotal = useMemo(() => {
    return atendimentos
      .filter((a) => a.status === "concluido")
      .reduce((acc, a) => acc + a.valor, 0);
  }, [atendimentos]);

  const saldoFormatado = saldoTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

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

      <hr />

      {/* -------------------- CONTEÚDO CENTRAL -------------------- */}
      <div className="conteudo">
        
        <div className="card-agenda">

          {/* KPI 1 */}
          <div className="kpi-card clientes-card">
            <div className="kpi-icon">👥</div>
            <h3 className="kpi-title">Clientes atendidos</h3>
            <p className="kpi-value">{clientesAtendidos}</p>
          </div>

          {/* KPI 2 */}
          <div className="kpi-card saldo-card">
            <div className="kpi-icon">$</div>
            <h3 className="kpi-title">Saldo total</h3>
            <p className="kpi-value saldo-value">{saldoFormatado}</p>
          </div>

          <h2 style={{ marginTop: "25px" }}>Histórico</h2>

          <div className="atendimentos-list">
            {atendimentos.map((a) => (
              <AtendimentoCard key={a.id} atendimento={a} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
