import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { router } from 'expo-router'
import { colors } from '@/styles/colors'

export default function Splash() {
  const restoreToken = useAuthStore(state => state.restoreToken)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initialize = async () => {
      await restoreToken() // Restaura o token do AsyncStorage
      setLoading(false)

      // Redireciona com base na autenticação
      if (isAuthenticated) {
        router.replace('/(tabs)/demands')
      } else {
        router.replace('/auth/sign-in')
      }
    }

    initialize()
  }, [isAuthenticated, restoreToken])

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-green-600 p-14">
        <ActivityIndicator color={colors.zinc[50]} size="large" />
        <Text className="text-xl font-semibold text-center text-white max-w-sm leading-relaxed tracking-wider">
          Sistema de desratização e pragas
        </Text>
      </View>
    )
  }
  return null
}
