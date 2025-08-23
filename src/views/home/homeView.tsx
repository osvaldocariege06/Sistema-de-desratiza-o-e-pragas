import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import React, { useState } from 'react'
import Header from './components/Header'
import { Demand } from '@/components/Demand'
import { colors } from '@/styles/colors'
import { Link } from 'expo-router'
import { Filter, Search } from 'lucide-react-native'
import { useAuthStore } from '@/stores/authStore'
import { useApiGetAllDemands } from './api/use-api-get-all-demands/useApiGetAllDemands'
import { SelectButton } from './components/SelectButton'

export default function HomeView() {
  const { user, logout } = useAuthStore()
  const { demands, errorDemands, isLoadingDemands, refetchDemands } =
    useApiGetAllDemands()

  const [select, setSelect] = useState<
    'all' | 'schedule' | 'pendent' | 'processing' | 'done'
  >('all')

  return (
    <>
      <Header user={user} />
      <FlatList
        data={demands ?? []}
        keyExtractor={item => String(item.id)}
        ItemSeparatorComponent={() => <View className="h-4" />}
        className="px-4"
        onRefresh={refetchDemands}
        refreshing={isLoadingDemands}
        ListHeaderComponent={() => (
          <View className="gap-y-4 w-full my-6">
            {/* <Link href={'/(tabs)/demands/filter-demands'} asChild> */}
            <Link href={'/(tabs)/create-demands'} asChild>
              <TouchableOpacity>
                <Text className="flex-row gap-2 text-sm items-center text-zinc-500 text-right">
                  Todos filtros <Filter size={16} color={colors.zinc[500]} />
                </Text>
              </TouchableOpacity>
            </Link>

            <View className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2">
              <Search size={18} color={colors.zinc[500]} />
              <TextInput
                placeholder="Pesquisar por demandas"
                placeholderTextColor={colors.zinc[400]}
                className="flex-1 text-sm"
              />
            </View>

            <Text className="font-semibold text-zinc-800">
              Minhas Demandas({demands?.length})
            </Text>
            <View className="flex flex-wrap flex-row gap-3">
              <SelectButton
                label="Todas"
                value="all"
                selected={select}
                onSelect={setSelect}
              />
              <SelectButton
                label="Agendadas"
                value="schedule"
                selected={select}
                onSelect={setSelect}
              />
              <SelectButton
                label="Pendentes"
                value="pendent"
                selected={select}
                onSelect={setSelect}
              />
              <SelectButton
                label="Em andamento"
                value="processing"
                selected={select}
                onSelect={setSelect}
              />
              <SelectButton
                label="Concluídas"
                value="done"
                selected={select}
                onSelect={setSelect}
              />
            </View>
          </View>
        )}
        renderItem={({ item }) => <Demand demand={item} />}
        ListEmptyComponent={() => {
          if (isLoadingDemands) {
            return (
              <ActivityIndicator className="mt-10" color={colors.green[600]} />
            )
          }

          if (errorDemands) {
            return (
              <Text className="text-center text-red-500 mt-10">
                Erro ao buscar demandas. Tente novamente.
              </Text>
            )
          }

          return (
            <Text className="text-center text-zinc-500 mt-10">
              Nenhuma demanda encontrada.
            </Text>
          )
        }}
      />
    </>
  )
}
