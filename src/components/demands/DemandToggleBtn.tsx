import { View, Text, Pressable } from 'react-native'
import React from 'react'

interface Props {
  setOptions: (option: 'details' | 'status' | 'files' | 'edit') => void
  options: 'details' | 'status' | 'files' | 'edit'
}

export default function DemandToggleBtn({ options, setOptions }: Props) {
  return (
    <View className="mt-4 justify-between items-center flex-row">
      <Pressable
        onPress={() => setOptions('details')}
        className={`flex-1  py-1 text-center justify-center items-center ${options === 'details' && 'border-b border-green-600'}`}
      >
        <Text
          className={`text-sm ${options === 'details' ? 'text-green-600' : 'text-zinc-400'}`}
        >
          Detalhes
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setOptions('status')}
        className={`flex-1  py-1 text-center justify-center items-center ${options === 'status' && 'border-b border-green-600'}`}
      >
        <Text
          className={`text-sm ${options === 'status' ? 'text-green-600' : 'text-zinc-400'}`}
        >
          Intervenção
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setOptions('files')}
        className={`flex-1  py-1 text-center justify-center items-center ${options === 'files' && 'border-b border-green-600'}`}
      >
        <Text
          className={`text-sm ${options === 'files' ? 'text-green-600' : 'text-zinc-400'}`}
        >
          Anexos
        </Text>
      </Pressable>
    </View>
  )
}
