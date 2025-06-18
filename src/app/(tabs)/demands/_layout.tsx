import { colors } from '@/styles/colors'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.green[600],
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Minhas Demandas',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notification"
        options={{
          headerBackTitle: "Voltar",
          title: 'Notificações',
        }}
      />
      <Stack.Screen
        name="filter-demands/index"
        options={{
          headerBackTitle: "Voltar",
          title: '',
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: '',
        }}
      />
    </Stack>
  )
}
