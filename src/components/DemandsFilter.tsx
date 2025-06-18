import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { DemandsFilterProps, Filter } from '@/types/demands'

export function DemandsFilter({ selectedFilter, onFilterSelect }: DemandsFilterProps) {
  const filters: Filter[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'pendentes', label: 'Pendentes' },
    { id: 'em_andamento', label: 'Em andamento' },
    { id: 'agendadas', label: 'Agendadas' },
    { id: 'concluidas', label: 'Concluídas' },
  ]

  return (
    <View>
      <Text className="font-semibold text-zinc-800">Minhas Demandas</Text>
      <View className="flex flex-wrap flex-row gap-3 mt-4">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => onFilterSelect?.(filter?.id)}
            className={`rounded-2xl px-4 py-2 active:scale-95 transition-transform ${selectedFilter === filter.id
                ? 'bg-green-600'
                : 'border border-zinc-400 bg-transparent'
              }`}
          >
            <Text
              className={`text-sm ${selectedFilter === filter.id
                  ? 'text-zinc-50'
                  : 'text-zinc-500'
                }`}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
} 