import type { DemandProps } from '@/types/demands'

export interface DemandsState {
  demands: DemandProps[]
  isLoading: boolean
  error: string | null
  
  // Actions
  createDemand: (demand: Omit<DemandProps, 'id'>) => Promise<void>
  updateDemand: (id: string, demand: Partial<DemandProps>) => Promise<void>
  getDemandById: (id: string) => Promise<DemandProps | undefined>
  getAllDemands: () => Promise<void>
} 