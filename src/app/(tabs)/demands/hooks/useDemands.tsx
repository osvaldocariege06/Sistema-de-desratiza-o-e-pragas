import { useDemandsStore } from '@/stores/demandsStore'
import React from 'react'
import { Animated } from 'react-native'

export function useDemands() {
  const {
    demands,
    isLoading,
    error,
    createDemand,
    updateDemand,
    getDemandById,
    getAllDemands,
  } = useDemandsStore()
  // States
  const [selectedFilter, setSelectedFilter] = React.useState('todas')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false)

  // Animations
  const filterHeight = React.useRef(new Animated.Value(1)).current

  // Memos
  const filteredDemands = React.useMemo(() => {
    if (!demands) return []

    // return demands?.data?.filter(demand => {
    //   const matchesSearch =
    //     searchQuery === '' ||
    //     demand?.description
    //       ?.toLowerCase()
    //       .includes(searchQuery.toLowerCase()) ||
    //     demand.customer.toLowerCase().includes(searchQuery.toLowerCase())
    //   const matchesFilter =
    //     selectedFilter === 'todas' ||
    //     ((selectedFilter === 'pendentes' && demand?.status === 1) ??
    //       'pending') ||
    //     (selectedFilter === 'em_andamento' &&
    //       demand?.status === 'in_progress') ||
    //     (selectedFilter === 'concluidas' && demand?.status === 'completed')
    //   return matchesSearch && matchesFilter
    // })
  }, [searchQuery, selectedFilter, demands])

  return {
    demands: demands,
    filteredDemands,
    selectedFilter,
    setSelectedFilter,
    searchQuery,
    setSearchQuery,
    isKeyboardVisible,
    filterHeight,
    isLoading,
    error,
    createDemand,
    updateDemand,
    getDemandById,
    getAllDemands,
  }
}
