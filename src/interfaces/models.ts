export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface CreateSchedulerFinance {
  valor: number;
  dataTransferencia: string;
  contaOrigem: string;
  contaDestino: string;
}

export interface ExtractFinance {
  id: number;
  valor?: number;
  valorFinal?: number;
  valorString?: string;
  valorFinalString?: string;
  dataAgendamento: string;
  dataTransferencia: string;
  contaOrigem: string;
  contaDestino: string;
  taxa: number
}
