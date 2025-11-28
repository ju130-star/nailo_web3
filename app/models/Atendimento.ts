interface IAtendimento {
  id: string;
  data: Date;
  horario: string; // Ex: "16:30 - 18:00"
  servico: string; // Ex: "Unha em gel"
  cliente: string; // Ex: "Cleide Barros" ou ID do cliente
  valor: number; // Valor do serviço em BRL
  pago: boolean;
  status: 'concluido' | 'cancelado' | 'pendente';
}