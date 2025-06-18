import { View, Text, Pressable } from 'react-native'
import React from 'react'
import type { DemandProps } from '@/types/demands'

interface Props {
  props?: DemandProps
}

export default function DemandStatus({ props }: Props) {
  return (
    <View className="py-4">
      <View className="border border-zinc-200 p-3 rounded-2xl">
        <Text className="text-sm text-zinc-500">Status da demanda</Text>
        <View className="flex-row items-center gap-2 mt-4 flex-wrap">
          {props?.status === 0 && (
            <Pressable className="py-2 px-4 rounded-2xl bg-yellow-600 justify-center items-center">
              <Text className="text-sm font-semibold text-white">Pendente</Text>
            </Pressable>
          )}
          {props?.status === 1 && (
            <Pressable className="py-2 px-4 rounded-2xl border border-orange-600 justify-center items-center">
              <Text className="text-sm font-semibold text-orange-600">
                Em andamento
              </Text>
            </Pressable>
          )}
          {props?.status === 2 && (
            <Pressable className="py-2 px-4 rounded-2xl border border-green-600 justify-center items-center">
              <Text className="text-sm font-semibold text-green-600">
                Concluído
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  )
}
