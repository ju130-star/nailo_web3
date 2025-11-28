// src/modules/agenda/model/schedule.model.ts

export interface TimeRange {
  inicio: string;
  fim: string;
}

export interface DaySchedule {
  id: string;        // seg, ter, qua...
  label: string;     // "Seg", "Ter", "Qua"...
  ativo: boolean;    // checkbox selecionado
  horarios: TimeRange[];
}

export const weekSchedule: DaySchedule[] = [
  {
    id: "seg",
    label: "Seg",
    ativo: false,
    horarios: [
      { inicio: "09:00", fim: "12:00" },
      { inicio: "13:20", fim: "17:00" }
    ]
  },
  {
    id: "ter",
    label: "Ter",
    ativo: false,
    horarios: [
      { inicio: "09:00", fim: "12:30" },
      { inicio: "13:30", fim: "19:00" }
    ]
  },
  {
    id: "qua",
    label: "Qua",
    ativo: false,
    horarios: [
      { inicio: "09:00", fim: "12:00" },
      { inicio: "13:20", fim: "17:00" }
    ]
  },
  {
    id: "qui",
    label: "Qui",
    ativo: false,
    horarios: [
      { inicio: "09:00", fim: "13:00" },
      { inicio: "13:30", fim: "19:00" }
    ]
  },
  {
    id: "sex",
    label: "Sex",
    ativo: false,
    horarios: [
      { inicio: "09:00", fim: "12:00" },
      { inicio: "13:20", fim: "17:30" }
    ]
},
  {
    id: "sab",
    label: "Sab",
    ativo: false,
    horarios: [
      { inicio: "09:00", fim: "13:00" },
      { inicio: "13:30", fim: "19:50" }
    ]
  }
];