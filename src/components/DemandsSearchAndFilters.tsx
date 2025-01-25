import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native'
import { Filter, Search } from 'lucide-react-native'
import { Link } from 'expo-router'
import { colors } from '@/styles/colors'
import { DemandsFilter } from './DemandsFilter'

interface DemandsSearchAndFiltersProps {
  searchQuery: string
  onSearchChange: (text: string) => void
  selectedFilter: string
  onFilterSelect: (filter: string) => void
  isKeyboardVisible: boolean
  filterHeight: Animated.Value
}

export function DemandsSearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterSelect,
  isKeyboardVisible,
  filterHeight,
}: DemandsSearchAndFiltersProps) {
  return (
    <View className="px-4 gap-4">
      <Link href={'/(tabs)/demands/filter-demands'} asChild>
        <TouchableOpacity className="flex-row justify-end gap-x-2 items-center px-4 py-2 rounded-2xl">
          <Text className="flex-row gap-2 text-sm items-center text-zinc-500 text-right">
            Todos filtros
          </Text>
          <Filter size={14} color={colors.zinc[500]} />
        </TouchableOpacity>
      </Link>

      <View className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2">
        <Search size={18} color={colors.zinc[500]} />
        <TextInput
          placeholder="Pesquisar por demandas"
          placeholderTextColor={colors.zinc[400]}
          className="flex-1 text-sm"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      {!isKeyboardVisible && (
        <Animated.View
          style={{
            transform: [{ scaleY: filterHeight }],
            opacity: filterHeight,
            maxHeight: 200,
            overflow: 'hidden',
          }}
        >
          <DemandsFilter
            selectedFilter={selectedFilter}
            onFilterSelect={onFilterSelect}
          />
        </Animated.View>
      )}
    </View>
  )
} 