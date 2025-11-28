'use client';
import React, { useState } from "react";
import { User } from "lucide-react";

type Appointment = { hora: string; nome: string; servico: string };

export default function AgendaPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const clientes = ["Pedro", "Josias", "Cleide"];

  const agendamentos: Record<number, Appointment[]> = {
    3: [
      { hora: "12:12", nome: "Maria", servico: "Unha em gel" },
      { hora: "14:30", nome: "Luana", servico: "Alongamento" }
    ],
    20: [
      { hora: "10:00", nome: "Carla", servico: "Retirada" }
    ]
  };

  const diasDoMes = Array.from({ length: 31 }, (_, i) => i + 1);

  // Safely get appointments for the selected day (or undefined)
  const dayAgendamentos = selectedDay !== null ? agendamentos[selectedDay] : undefined;

  return (
    <div className="w-full h-screen bg-[#A7E8E4] flex flex-col">
      {/* ---------- HEADER ---------- */}
      <header className="w-full h-16 bg-[#48CFCB] flex justify-between items-center px-6 text-white text-xl font-semibold">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full"></div>
          Nailo
        </div>
        <nav className="flex gap-10">
          <a href="#">Home</a>
          <a href="#">Agenda</a>
          <a href="#">Historico</a>
        </nav>
        <User className="w-8 h-8" />
      </header>

      <div className="flex flex-1 p-4 gap-4">
        {/* ---------- LISTA DE CLIENTES ---------- */}
        <aside className="w-56 bg-white border border-gray-300 rounded-xl p-4 flex flex-col gap-6">
          {clientes.map((c) => (
            <div key={c} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={40} />
              </div>
              <span className="mt-2 text-lg font-semibold">{c}</span>
            </div>
          ))}
        </aside>

        {/* ---------- CALENDARIO CENTRAL ---------- */}
        <main className="flex-1 bg-white border border-gray-300 rounded-xl p-4 flex flex-col items-center">
          {/* Dias da semana */}
          <div className="grid grid-cols-7 w-full text-center font-bold text-[#006D66] mb-2">
            {"DSTQQSS".split("").map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Dias do mês */}
          <div className="grid grid-cols-7 grid-rows-5 gap-2 w-full h-full">
            {diasDoMes.map((dia) => (
              <button
                key={dia}
                onClick={() => setSelectedDay(dia)}
                className={`border rounded-lg h-20 flex items-start p-1 text-sm bg-gray-200 ${
                  selectedDay === dia ? "bg-[#48CFCB] text-white" : ""
                }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </main>

        {/* ---------- AGENDA DO DIA ---------- */}
        <aside className="w-64 bg-white border border-gray-300 rounded-xl p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-3">Agendamentos</h2>
          {selectedDay ? (
            dayAgendamentos && dayAgendamentos.length > 0 ? (
              dayAgendamentos.map((ag, index) => (
                <div key={`${selectedDay}-${index}`} className="p-3 border-b border-gray-300">
                  <p><strong>Hora:</strong> {ag.hora}</p>
                  <p><strong>Cliente:</strong> {ag.nome}</p>
                  <p><strong>Serviço:</strong> {ag.servico}</p>
                </div>
              ))
            ) : (
              <p>Nenhum agendamento neste dia.</p>
            )
          ) : (
            <p>Selecione um dia.</p>
          )}
        </aside>
      </div>
    </div>
  );
}

