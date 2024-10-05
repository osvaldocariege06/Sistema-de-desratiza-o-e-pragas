import { colors } from '@/styles/colors'
import { Tabs } from 'expo-router'
import { Home, Plus, User } from 'lucide-react-native'
import { usePathname } from 'expo-router'
import { useState } from 'react'

export default function TabLayout() {
  const pathname = usePathname()

  const [userType, setUserType] = useState<'owner' | 'user'>('owner')

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.green[600],
        tabBarStyle: {
          height: 70,
          display:
            pathname === '/demands/details/[id]' ||
            pathname === '/demands/filter-demands' ||
            pathname === '/demands/notification'
              ? 'none'
              : 'flex',
        },
      }}
    >
      <Tabs.Screen
        name="demands"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create-demands/index"
        options={{
          href: userType !== 'owner' ? '' : null,
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <Plus size={28} color={color} />,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  )
}
