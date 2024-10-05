import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'

export default function Notification() {
  return (
    <SafeAreaView className="flex-1">
      <View className=" gap-0">
        <Text className="text-zinc-600 text-xl font-semibold p-4">
          Notificações
        </Text>

        <View className="flex-col gap-4">
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={() => (
              <Pressable className="border-l-4 border-green-600 bg-zinc-200 p-4 mb-2">
                <Text className="text-zinc-500 font-medium">Notificação</Text>
                <Text className="text-zinc-500 text-sm">
                  Notefique me assim que puder, Notificação
                </Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
