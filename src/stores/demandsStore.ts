import { create } from 'zustand'
import { api } from '@/lib/axios'
import type { DemandsState } from '@/interfaces/demands'
import { mockDemands } from '@/mocks/demands'

export const useDemandsStore = create<DemandsState>((set, get) => ({
  demands: mockDemands,
  isLoading: false,
  error: null,

  // Create new demand
  createDemand: async newDemand => {
    try {
      set({ isLoading: true, error: null })
      const response = await api.post('/PestRoteiro/create', newDemand)

      set(state => ({
        demands: [...state.demands, response.data],
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erro ao criar demanda',
        isLoading: false,
      })
      throw error
    }
  },

  // Update existing demand
  updateDemand: async (id, updatedDemand) => {
    try {
      set({ isLoading: true, error: null })
      const response = await api.put('/PestRoteiro/edit', updatedDemand)

      set(state => ({
        demands: state.demands.map(demand =>
          demand.id === id ? response.data : demand
        ),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Erro ao atualizar demanda',
        isLoading: false,
      })
      throw error
    }
  },

  // Get demand by ID
  getDemandById: async id => {
    try {
      set({ isLoading: true, error: null })
      const response = await api.get(`/PestRoteiro/get-by-id/${id}`)
      set({ isLoading: false })
      return response.data
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Erro ao buscar demanda',
        isLoading: false,
      })
      throw error
    }
  },

  // Get all demands
  getAllDemands: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await api.get('/PestRoteiro/get-list')
      console.log('response.data', response.data)

      set({
        demands: response.data,
        isLoading: false,
      })
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Erro ao listar demandas',
        isLoading: false,
      })
      throw error
    }
  },
}))
