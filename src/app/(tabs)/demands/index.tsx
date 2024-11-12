import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { colors } from '@/styles/colors'
import { BellDot, Filter, Search } from 'lucide-react-native'
import { Link } from 'expo-router'
import { Demand } from '@/components/Demand'

export default function Demands() {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        backgroundColor={'#086632'}
        barStyle={'dark-content'}
        translucent
      />
      <ScrollView>
        {/* HEADER */}
        <View className="h-20 bg-green-600 flex-row justify-between items-center px-4">
          <View className="flex-row items-center gap-2">
            <Avatar className="bg-[#F0C274] h-12 w-12 rounded-full justify-center items-center">
              <AvatarImage src={'/'} />
              <AvatarFallback>
                <Text className="text-sm text-white">JD</Text>
              </AvatarFallback>
            </Avatar>
            <View>
              <Text className="text-[10px] text-white font-regular">
                Bem-vindo!
              </Text>
              <Text className="text-sm text-white font-semibold tracking-wide">
                John Doe
              </Text>
            </View>
          </View>

          <Link href={'/(tabs)/demands/notification'}>
            <BellDot size={24} color={'#FFF'} />
          </Link>
        </View>

        <View className="p-4 gap-4">
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

          {/* DEMANDS LIST */}
          <View className="flex-col gap-4">
            <Demand />
            <Demand />
            <Demand />
            <Demand />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
