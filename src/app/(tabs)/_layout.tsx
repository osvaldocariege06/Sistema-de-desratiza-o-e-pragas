import { colors } from '@/styles/colors'
import { Tabs } from 'expo-router'
import { Home, Plus, User } from 'lucide-react-native'
import { usePathname } from 'expo-router'
import { View } from 'react-native'

export const userType = {
  owner: false,
}
export default function TabLayout() {
  const pathname = usePathname()

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
          href: userType.owner ? undefined : null,
          title: '',
          headerShown: false,
          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: colors.green[600],
                padding: 8,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <Plus size={28} color={colors.zinc[50]} />
            </View>
          ),
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
