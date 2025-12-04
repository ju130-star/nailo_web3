"use client";

import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { useRouter } from "next/navigation";
import app from "../firebase/firebase";


interface Agendamento {
  id: string;
  cliente: string;
  data: string; // formato "2025-12-03"
  horario: string;
  servico: string;
}

export default function CalendarioCentral() {
  const db = getFirestore(app);
  const router = useRouter();

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [diasMes, setDiasMes] = useState<number[]>([]);
  const [primeiroDiaSemana, setPrimeiroDiaSemana] = useState(0);

  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  const nomesMes = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const diasSemana = ["D", "S", "T", "Q", "Q", "S", "S"];

  useEffect(() => {
    // Buscar agendamentos
    const fetch = async () => {
      const ref = collection(db, "agendamentos");
      const snap = await getDocs(ref);

      const lista = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Agendamento[];

      setAgendamentos(lista);
    };
    fetch();

    // Dias do mês
    const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const arr = Array.from({ length: totalDias }, (_, i) => i + 1);
    setDiasMes(arr);

    // Descobrir em qual dia da semana o mês começa
    const diaSemana = new Date(anoAtual, mesAtual, 1).getDay();
    setPrimeiroDiaSemana(diaSemana);
  }, []);

  // pegar agendamentos do dia
  const eventosDoDia = (dia: number) => {
    const dataFormatada = `${anoAtual}-${String(mesAtual + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    return agendamentos.filter((ag) => ag.data === dataFormatada);
  };

  return (
    <div className="calendario-container">
      
      {/* Título do mês */}
      <h2 className="titulo-mes">{nomesMes[mesAtual]} {anoAtual}</h2>

      {/* Cabeçalho dos dias da semana */}
      <div className="dias-semana">
        {diasSemana.map((d, index) => (
          <div key={index} className="dia-semana">{d}</div>
        ))}
      </div>

      {/* Grid do calendário */}
      <div className="grid-calendario">
        {/* espaços vazios antes do 1º dia */}
        {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
          <div key={`vazio-${i}`} className="dia-vazio"></div>
        ))}

        {/* dias do mês */}
        {diasMes.map((dia, index) => (
          <div
            key={index}
            className="dia-box"
            onClick={() => router.push(`/agenda/dia/${dia}`)}
          >
            <span className="numero-dia">{dia}</span>

            <div className="eventos-dia">
              {eventosDoDia(dia).map((ev) => (
                <p key={ev.id} className="evento-item">
                  {ev.cliente}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
