/**
 * Calcula os KPIs financeiros com base nos atendimentos.
 */
const calcularFinancas = (atendimentos: IAtendimento[]) => {
  const atendimentosConcluidos = atendimentos.filter(a => a.status === 'concluido');

  // 1. Saldo (soma dos valores pagos em atendimentos concluídos)
  const totalSaldo = atendimentosConcluidos.reduce((sum, a) => sum + a.valor, 0);

  // 2. Clientes Atendidos (conta clientes únicos em atendimentos concluídos)
  const clientesUnicos = new Set(atendimentosConcluidos.map(a => a.cliente));
  const totalClientesAtendidos = clientesUnicos.size;

  return {
    totalSaldo,
    totalClientesAtendidos,
    atendimentosConcluidos,
  };
};

/**
 * Formata um valor numérico para BRL (R$).
 */
const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valor);
};

/**
 * Formata a data para um formato amigável (ex: Segunda 17/09).
 */
const formatarDataAtendimento = (data: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
  }).format(data);
};