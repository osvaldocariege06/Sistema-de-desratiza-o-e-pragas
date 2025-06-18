import { View, Text, FlatList, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from './components/Header'
import { Demand } from '@/components/Demand'
import { colors } from '@/styles/colors'
import { Link } from 'expo-router'
import { Filter, Search } from 'lucide-react-native'
import { useAuthStore } from '@/stores/authStore'

export default function HomeView() {
  const { user } = useAuthStore()

  console.log("user", user);


  return (
    <>
      <Header user={user} />
      <FlatList
        data={[1, 2, 3]}
        ItemSeparatorComponent={() => <View className='h-4' />}
        className='px-4'
        ListHeaderComponent={() => (
          <View className='gap-y-2 w-full my-6'>
            <Link href={'/(tabs)/demands/filter-demands'} asChild>
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

            {/* DEMANDS STATUS */}
            <Text className="font-semibold text-zinc-800">Minhas Demandas</Text>
            <View className="flex flex-wrap flex-row gap-3">
              <Pressable className="rounded-2xl px-4 py-2 bg-green-600 active:scale-95 transition-transform">
                <Text className="text-sm text-zinc-50">Todas</Text>
              </Pressable>
              <Pressable className="rounded-2xl px-4 py-2 border border-zinc-400 active:scale-95 transition-transform">
                <Text className="text-sm text-zinc-500">Agendadas</Text>
              </Pressable>
              <Pressable className="rounded-2xl px-4 py-2 border border-zinc-400 active:scale-95 transition-transform">
                <Text className="text-sm text-zinc-500">Pendentes</Text>
              </Pressable>
              <Pressable className="rounded-2xl px-4 py-2 border border-zinc-400 active:scale-95 transition-transform">
                <Text className="text-sm text-zinc-500">Em andamento</Text>
              </Pressable>
              <Pressable className="rounded-2xl px-4 py-2 border border-zinc-400 active:scale-95 transition-transform">
                <Text className="text-sm text-zinc-500">Concluídas</Text>
              </Pressable>
            </View>
          </View>
        )}
        renderItem={() => (
          <Demand />
        )}
      />
    </>
  )
}