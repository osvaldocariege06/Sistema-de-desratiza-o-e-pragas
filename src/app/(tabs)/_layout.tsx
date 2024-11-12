import { colors } from '@/styles/colors'
import { Tabs } from 'expo-router'
import { Home, Plus, User } from 'lucide-react-native'
import { usePathname } from 'expo-router'
import { Pressable, View } from 'react-native'
import { Text } from 'react-native'
import { useAuthStore } from '@/stores/authStore'

export const userType = {
  owner: false,
}
export default function TabLayout() {
  const pathname = usePathname()
  const { isAdmin } = useAuthStore()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.green[600],

        tabBarStyle: {
          height:
            pathname !== '/demands' &&
            pathname !== '/profile' &&
            pathname !== '/create-demands'
              ? 0
              : 70,
          display:
            pathname !== '/demands' &&
            pathname !== '/profile' &&
            pathname !== '/create-demands'
              ? 'none'
              : 'flex',
        },
      }}
    >
      <Tabs.Screen
        name="demands"
        options={{
          title: 'Demandas',
          headerShown: false,
          tabBarIconStyle: { marginTop: -10 },
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs mb-2  ${focused ? 'text-green-600' : 'text-zinc-500'}`}
            >
              Demandas
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Home size={28} color={color} style={{ marginTop: 20 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-demands/index"
        options={{
          href: isAdmin ? undefined : null,
          title: '',
          headerShown: false,
          tabBarIconStyle: { marginTop: 14 },
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs mb-2 mt-2  ${focused ? 'text-green-600' : 'text-zinc-500'}`}
            >
              Criar
            </Text>
          ),
          tabBarIcon: () => (
            <Pressable
              style={{
                backgroundColor: colors.green[600],
                width: 32,
                height: 32,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <Plus size={20} color={colors.zinc[50]} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIconStyle: { marginTop: -10 },
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs mb-2  ${focused ? 'text-green-600' : 'text-zinc-500'}`}
            >
              Perfil
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <User size={28} color={color} style={{ marginTop: 20 }} />
          ),
        }}
      />
    </Tabs>
  )
}
