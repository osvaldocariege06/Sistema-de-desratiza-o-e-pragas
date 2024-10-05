import { View, Text, StatusBar, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
import { Fingerprint, Lock, LogOut, Menu, User } from 'lucide-react-native'
import { getIniciais } from '@/utils/get-Iniciais-name'
import { colors } from '@/styles/colors'
import { Button } from '@/components/Button'

export default function Profile() {
  const [enableTouchId, setEnableTouchId] = useState(false)

  function handleEnableTouchId() {
    setEnableTouchId(!enableTouchId)
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
                Osvaldo Cariege
              </Text>
              <Text className="text-sm text-green-600 font-regular">
                osvaldocariege06@gmail.com
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-col gap-4 p-4 mt-8">
          <View className="border border-zinc-200 p-3 gap-2 rounded-2xl">
            <Text className="text-sm font-semibold text-green-600 ml-4">
              Meus dados
            </Text>
            <View className="flex-row items-center gap-2 px-4">
              <User size={16} color={colors.zinc[500]} />
              <Text className="text-sm text-zinc-500">Cargo:</Text>
              <Text className="text-sm text-zinc-500 font-medium">
                Operador
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
          <Button variant="secondary">
            <LogOut size={16} color={colors.zinc[100]} />
            <Button.Title className="text-white">Terminar sessão</Button.Title>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
