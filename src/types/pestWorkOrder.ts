// types/pestWorkOrder.ts
export interface PestWorkOrderUpdate {
  id?: string;
  dataMarcacao: string;
  duracaoPrevista: string;
  horaDeslocacao: string;
  horaChegada: string;
  inicioServico: string;
}

export interface PestWorkOrderResponse {
  success: boolean;
  message?: string;
  data?: PestWorkOrderUpdate;
}
