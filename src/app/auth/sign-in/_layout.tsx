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
      <Stack.Screen
        name="index"
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          title: '',
        }}
      />
    </Stack>
  )
}
