import { colors } from '@/styles/colors'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

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
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen
        name="index"
        options={{
          title: 'Recuperar Senha',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="confirm-code/index"
        options={{
          headerShown: false,
          title: '',
        }}
      />
    </Stack>
  )
}
