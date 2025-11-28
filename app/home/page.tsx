"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, X } from "lucide-react"; 
import { useState } from "react"; 

// --------------------------------------------------------------------------------
// INTERFACE DE DADOS
// --------------------------------------------------------------------------------

interface Appointment {
  id: string;
  hour: string;
  clientName: string;
  service: string;
}

// --------------------------------------------------------------------------------
// COMPONENTE AGENDA DETALHADA
// --------------------------------------------------------------------------------

// Tipagem das props do componente
interface AgendaDetalhadaProps {
    day: string | null;
    appointments: Appointment[]; // O array agora usa a interface Appointment
    onClose: () => void;
}

function AgendaDetalhada({ day, appointments, onClose }: AgendaDetalhadaProps) {
  if (!day) return null; 

  const allHours = [
    "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  return (
    <div className="agenda-detalhada-modal">
      <div className="modal-content">
        <div className="modal-header">
          {/* O operador '!' afirma ao TS que day não será null neste ponto */}
          <h3>📅 Agendamentos para **{day!}**</h3>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>
        <div className="appointment-list">
          {allHours.map((hour) => {
            const appointment = appointments.find(app => app.hour === hour);
            const isLunchBreak = hour === "12:00"; 

            return (
              <div 
                key={hour} 
                className={`appointment-item ${appointment ? 'booked' : (isLunchBreak ? 'break' : 'available')}`}
              >
                <span className="hour-detail">**{hour}**</span>
                {appointment ? (
                  <div className="client-info">
                    <p>Cliente: **{appointment.clientName}**</p>
                    <p>Serviço: {appointment.service}</p>
                  </div>
                ) : isLunchBreak ? (
                  <span className="availability-status">INTERVALO (Almoço)</span>
                ) : (
                  <span className="availability-status">Livre</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------------
// COMPONENTE HOMEPAGE
// --------------------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();
  
  // CORREÇÃO ESSENCIAL #1: Tipando o estado para aceitar string OU null
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  
  // Tipando o estado para aceitar um array de Appointment
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];


  // CORREÇÃO ESSENCIAL #2: Tipando o parâmetro 'day' como string
  const handleDayClick = async (day: string) => {
    // Se clicar no dia que já está aberto, fecha o modal.
    if (day === selectedDay) {
      setSelectedDay(null);
      setAppointments([]);
      return;
    }
    
    // O TypeScript agora aceita a string aqui!
    setSelectedDay(day);

    // MOCK ATUALIZADO (com novos horários e Sábado)
    if (day === "Segunda") {
        setAppointments([
            { id: "1", hour: "09:00", clientName: "Maria Silva", service: "Manicure" },
            { id: "2", hour: "15:00", clientName: "Ana Souza", service: "Pedicure" }
        ]);
    } else if (day === "Quarta") {
        setAppointments([
            { id: "3", hour: "14:00", clientName: "João Pedro", service: "Corte Masculino" }
        ]);
    } else if (day === "Sábado") { 
        setAppointments([
            { id: "4", hour: "10:00", clientName: "Bia Ferreira", service: "Escova" },
            { id: "5", hour: "17:00", clientName: "Laura Mendes", service: "Tratamento Capilar" }
        ]);
    } else {
        setAppointments([]);
    }
    
    // TODO: Chame sua função de busca no Firebase aqui
  };


  const handleCloseAgenda = () => {
    setSelectedDay(null);
    setAppointments([]);
  };

  // Mapeia os dias de Segunda a Sábado
  const scheduleRows = daysOfWeek.slice(0, 6).map((day) => (
    <div 
      key={day}
      className="linha-dia"
      onClick={() => handleDayClick(day)} 
      style={{ cursor: 'pointer' }}
    >
      <div className="col-dia">
        <input type="checkbox" />
        <span>{day}</span>
      </div>

      <div className="col-horarios">
        <span className="hora">09:00</span>
        <span className="hora">13:00</span>
        <span className="hora">17:00</span>
      </div>
    </div>
  ));


  return (
    <div className="agenda-container">
      {/* -------------------- HEADER -------------------- */}
      <header className="header">
        {/* ... conteúdo do header ... */}
        <div className="header-left">
          <img src="/img/Nailo1.png" alt="Logo" width={60} height={60} className="logo-home"/>
        </div>
        <nav className="menu-right">
          <a href="/home">Home</a><a href="/agenda">Agenda</a>
          <a href="/financas">Finanças</a>
          <a href="/">Sair</a>
          <a href="/perfil" className="profile-icon"><User size={28} /></a>
        </nav>
      </header>
      <hr />

      {/* -------------------- CONTEÚDO CENTRAL -------------------- */}
      <div className="conteudo">
        <div className="card-agenda">
          <div className="settings">
            <Image src="/images/config.png" width={28} height={28} alt="Configurações" style={{ cursor: "pointer" }} onClick={() => router.push("/configuracoes")}/>
          </div>
          
          {scheduleRows}
          
          {selectedDay && <p className="selection-message">Dia **{selectedDay}** selecionado. Clique novamente para fechar ou clique em outro dia.</p>}

        </div>
      </div>

      {/* -------------------- AGENDA DETALHADA (Modal/Sobreposição) -------------------- */}
      <AgendaDetalhada 
        day={selectedDay} 
        appointments={appointments} 
        onClose={handleCloseAgenda} 
      />
    </div>
  );
}