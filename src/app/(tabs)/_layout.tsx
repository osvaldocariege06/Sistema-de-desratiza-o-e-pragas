import { colors } from '@/styles/colors'
import { Tabs } from 'expo-router'
import { Home, Settings } from 'lucide-react-native'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.green[600] }}>
      <Tabs.Screen
        name="demands"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
        }}
      />
    </Tabs>
  )
}
