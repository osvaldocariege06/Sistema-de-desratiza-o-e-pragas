import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  Animated,
} from 'react-native'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { colors } from '@/styles/colors'
import { BellDot, Filter, Search } from 'lucide-react-native'
import { Link } from 'expo-router'
import { Demand } from '@/components/Demand'
import { useAuthStore } from '@/stores/authStore'
import { DemandsFilter } from '@/components/DemandsFilter'
import type { DemandProps } from '@/types/demands'
import { DemandsHeader } from '@/components/DemandsHeader'
import { DemandsSearchAndFilters } from '@/components/DemandsSearchAndFilters'

export default function Demands() {
  // States
  const { user } = useAuthStore()
  const [selectedFilter, setSelectedFilter] = React.useState('todas')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [demands, setDemands] = React.useState<DemandProps[]>([])
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false)
  
  // Animations
  const filterHeight = React.useRef(new Animated.Value(1)).current

  // Effects
  React.useEffect(() => {
    // Mock Data
    setDemands([
      {
        id: '1',
        customerName: 'Edward Bates',
        location: '1196 Imoti Point',
        progress: 50,
        startDate: '12 Jan 2023',
        endDate: '20 Mar 2023',
        status: 'pending',
        team: [
          { name: 'Osvaldo Cariege', backgroundColor: 'bg-violet-600' },
          { name: 'Peter Weber', backgroundColor: 'bg-yellow-600' },
          { name: 'Bernard Fowler', backgroundColor: 'bg-red-600' },
          { name: 'Walter Mullins', backgroundColor: 'bg-green-600' },
        ],
      },
      {
        id: '2',
        customerName: 'John Doe',
        location: '789 Tech Valley',
        progress: 75,
        startDate: '15 Feb 2023',
        endDate: '30 Apr 2023',
        status: 'in_progress',
        team: [
          { name: 'Alice Smith', backgroundColor: 'bg-blue-600' },
          { name: 'Bob Johnson', backgroundColor: 'bg-purple-600' },
        ],
      },
    ])

    // Keyboard Listeners
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
      Animated.timing(filterHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    })

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
      Animated.timing(filterHeight, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  // Memos
  const filteredDemands = React.useMemo(() => {
    if (!demands) return []

    return demands.filter((demand) => {
      const matchesSearch =
        searchQuery === '' ||
        demand.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demand.customerName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter =
        selectedFilter === 'todas' ||
        (selectedFilter === 'pendentes' && demand.status === 'pending') ||
        (selectedFilter === 'em_andamento' && demand.status === 'in_progress') ||
        (selectedFilter === 'concluidas' && demand.status === 'completed')

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, selectedFilter, demands])

  // Render Components
  const renderHeader = () => (
    <View className="h-20 bg-red-600 flex-row justify-between items-center px-4">
      <View className="flex-row items-center gap-2">
        <Avatar className="bg-[#F0C274] h-12 w-12 rounded-full justify-center items-center">
          <AvatarImage src={'/'} />
          <AvatarFallback>
            <Text className="text-sm text-white">JD</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Text className="text-[10px] text-white font-regular">Bem-vindo!</Text>
          <Text className="text-sm text-white font-semibold tracking-wide">
            {user?.username}
          </Text>
        </View>
      </View>

      <Link href={'/(tabs)/demands/notification'}>
        <BellDot size={24} color={'#FFF'} />
      </Link>
    </View>
  )

  const renderSearchAndFilters = () => (
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
          onChangeText={setSearchQuery}
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
            onFilterSelect={setSelectedFilter}
          />
        </Animated.View>
      )}
    </View>
  )

  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        backgroundColor={'#086632'}
        barStyle={'light-content'}
        translucent
      />
      <DemandsHeader username={user?.username} />

      <View style={styles.container}>
        <DemandsSearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterSelect={setSelectedFilter}
          isKeyboardVisible={isKeyboardVisible}
          filterHeight={filterHeight}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <FlatList
            data={filteredDemands}
            keyExtractor={(item) => item.id}
            renderItem={({ item: demand }) => <Demand {...demand} />}
            ListEmptyComponent={() => (
              <Text className="text-center text-zinc-500">
                Nenhuma demanda encontrada
              </Text>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            bounces={false}
            overScrollMode="never"
            removeClippedSubviews={true}
            windowSize={5}
          />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    marginTop: 16,
  },
  listContent: {
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
})
