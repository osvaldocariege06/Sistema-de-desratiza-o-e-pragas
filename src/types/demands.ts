export interface Filter {
  id: string
  label: string
}

export interface DemandsFilterProps {
  selectedFilter: string
  onFilterSelect: (filterId: string) => void
} 
export interface DemandProps {
  id: string
  customerName: string
  location: string
  progress: number
  startDate: string
  endDate: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  team: {
    name: string
    avatarUrl?: string
    backgroundColor: string
  }[]
}