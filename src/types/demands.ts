export interface Filter {
  id: string;
  label: string;
}

export interface DemandsFilterProps {
  selectedFilter?: string;
  onFilterSelect?: (filterId: string) => void;
}

interface TeamMember {
  id: string;
  name: string;
  backgroundColor: string;
  avatarUrl?: string;
  role: string;
}

export interface DemandProps {
  arriveToCustomerDate?: string;
  closedDate?: string;
  confirmedTeam?: string;
  createdBy?: string;
  createdDate?: string;
  customer?: string;
  customerAddressDesignation?: string;
  customerAddressDetails?: string;
  depatureOfficeDate?: string;
  description?: string;
  expectedDate?: string;
  id?: number;
  priority?: "NORMAL" | "ALTA" | "BAIXA"; // Supondo que existam outros níveis de prioridade
  reference?: string;
  requestDate?: string;
  status?: number;
  technicianId?: number;
  ticketId?: number;
  workBeginDate?: string;
  workEndDate?: string;
}

// export interface DemandProps {
//   id: number;
//   ticketId: number;
//   propostaId: number;
//   invoiceId: number;
//   visitoriaId: number;
//   equipaId: number;
//   dataMarcacao: string; // ISO Date String
//   duracaoPrevista: number;
//   horaDeslocacao: string; // ISO Date String
//   horaChegada: string; // ISO Date String
//   inicioServico: string; // ISO Date String
//   equipaConfirmada: string;
//   statusId: number;
//   veiculoUsadoId: number;
//   kmInicial: number;
//   kmRetorno: number;
//   riscosVizinhos: string;
//   nivelInfestacao: string;
//   nivelHigiene: string;
//   localOperacaoId: number;
//   customerId: number;
//   customer: string;
// }

export interface DemandResponse {
  success: boolean;
  message: string;
  data: DemandProps[];
  totalRecords: number | null;
  returnUrl: string;
}
