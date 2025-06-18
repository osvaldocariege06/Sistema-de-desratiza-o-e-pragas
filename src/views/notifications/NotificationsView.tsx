import { Text, FlatList } from 'react-native'
import React from 'react'
import NotificationCard from './components/NotificationCard'

export default function NotificationsView() {
  return (
    <FlatList
      className='flex-1'
      data={[1, 2, 3, 4, 5, 6]}
      ListHeaderComponent={() => (
        <Text className="text-zinc-600 text-xl font-semibold p-4">
          Notificações
        </Text>
      )}
      renderItem={() => (
        <NotificationCard />
      )}
    />
  )
}