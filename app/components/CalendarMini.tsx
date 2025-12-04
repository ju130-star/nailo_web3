"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarMini() {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = mês atual
  const today = new Date();

  const getMonthData = (offset = 0) => {
    const date = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return {
      year,
      month,
      firstDay,
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1)
    };
  };

  const monthsToShow = [0, 1, 2]; // mês atual + 2 abaixo

  return (
    <div className="calendar-mini-stack">
      {monthsToShow.map((offset) => {
        const data = getMonthData(currentMonth + offset);

        return (
          <div key={offset} className="calendar-mini-card">

            {/* -------- HEADER MÊS + SETAS -------- */}
            <div className="calendar-mini-header">
              <strong>
                {new Date(data.year, data.month).toLocaleString("pt-BR", {
                  month: "long",
                  year: "numeric"
                })}
              </strong>

              <div className="calendar-mini-nav">
                <button onClick={() => setCurrentMonth((v) => v - 1)}>
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setCurrentMonth((v) => v + 1)}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            

            {/* -------- NOME DOS DIAS -------- */}
            <div className="calendar-mini-week">
              {["DOM","SEG","TER","QUA","QUI","SEX","SAB"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            {/* -------- GRID -------- */}
            <div className="calendar-mini-grid">
              {/* Espaços vazios antes do dia 1 */}
              {Array.from({ length: data.firstDay }).map((_, i) => (
                <div key={"empty-" + i} />
              ))}

              {/* Dias reais */}
              {data.days.map((dia) => (
                <div
                  key={dia}
                  className={
                    today.getDate() === dia &&
                    today.getMonth() === data.month &&
                    today.getFullYear() === data.year
                      ? "calendar-mini-day selected"
                      : "calendar-mini-day"
                  }
                >
                  {dia}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
