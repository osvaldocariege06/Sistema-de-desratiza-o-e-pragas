import { View, Text, StatusBar, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
import { Fingerprint, Lock, LogOut, Menu, User } from 'lucide-react-native'
import { getIniciais } from '@/utils/get-Iniciais-name'
import { colors } from '@/styles/colors'
import { Button } from '@/components/Button'
import { useAuthStore } from '@/stores/authStore'
import { router } from 'expo-router'

export default function Profile() {
  const [enableTouchId, setEnableTouchId] = useState(false)
  const { user, logout, isAdmin } = useAuthStore()

  function handleEnableTouchId() {
    setEnableTouchId(!enableTouchId)
  }

  async function handleLogout() {
    await logout()
    router.replace('/auth/sign-in')
  }

  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        backgroundColor={'#086632'}
        barStyle={'dark-content'}
        translucent
      />
      <ScrollView>
        {/* HEADER */}
        <View className="flex-col justify-center items-center px-4 mt-8">
          <View className="flex-col items-center justify-center gap-4">
            <Avatar className="bg-orange-300 h-24 w-24 rounded-full justify-center items-center">
              <AvatarImage src={'/'} />
              <AvatarFallback>
                <Text className="text-sm text-white">
                  {getIniciais('Jane Gutierrez')}
                </Text>
              </AvatarFallback>
            </Avatar>
            <View className="justify-center items-center">
              <Text className="text-sm text-green-600 font-semibold tracking-wide">
                {user?.username}
              </Text>
              <Text className="text-sm text-green-600 font-regular">
                {user?.email || ''}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-col gap-4 p-4 mt-8 flex-1">
          <View className="border border-zinc-200 p-3 gap-2 rounded-2xl">
            <Text className="text-sm font-semibold text-green-600 ml-4">
              Meus dados
            </Text>
            <View className="flex-row items-center gap-2 px-4">
              <User size={16} color={colors.zinc[500]} />
              <Text className="text-sm text-zinc-500">Cargo:</Text>
              <Text className="text-sm text-zinc-500 font-medium">
                {user?.designation ? user?.designation : 'Operador'}
              </Text>
            </View>
          </View>
          <View className="border border-zinc-200 p-3 gap-2 rounded-2xl">
            <Text className="text-sm font-semibold text-green-600 ml-4 mb-2">
              Segurança
            </Text>
            <View className="flex-row items-center gap-2 px-4">
              <Lock size={16} color={colors.zinc[500]} />
              <Text className="text-sm text-zinc-500">Senha:</Text>
              <Text className="text-sm text-zinc-500 font-medium">*******</Text>
            </View>
            <View className="flex-row items-center gap-2 px-4">
              <Fingerprint size={16} color={colors.zinc[500]} />
              <Text className="text-sm text-zinc-500">
                Impressão Biométrica:
              </Text>
              <Pressable onPress={handleEnableTouchId}>
                <Text className="text-sm text-green-600 font-medium">
                  {!enableTouchId ? 'Desativada' : 'Ativada'}
                </Text>
              </Pressable>
            </View>
          </View>
          <Pressable
            onPress={handleLogout}
            className="mt-20 bg-zinc-800 text-zinc-100 flex-row gap-2 h-12 rounded-md justify-center items-center"
          >
            <LogOut size={16} color={colors.zinc[100]} />
            <Text className="text-white">Terminar sessão</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
