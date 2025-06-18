import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function NotificationCard() {
  return (
    <TouchableOpacity className="border-l-4 border-green-600 bg-zinc-200 p-4 mb-2">
      <Text className="text-zinc-500 font-medium">Notificação</Text>
      <Text className="text-zinc-500 text-sm">
        Notefique me assim que puder, Notificação
      </Text>
    </TouchableOpacity>
  )
}