import { StatusBar } from 'react-native'
import { Slot, Redirect } from 'expo-router'
import '../../global.css'
import '@/utils/dayjs-config'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from '@tanstack/react-query'
import Toast from 'react-native-toast-message';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins'
import Splash from '@/components/Splash'
import { colors } from '@/styles/colors'
import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'
import { queryClient } from '@/lib/queryClient'

export default function Layout() {
  const { isAuthenticated, restoreToken, user } = useAuthStore()

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  })

  useEffect(() => {
    const loadAuthState = async () => {
      await restoreToken()
    }
    loadAuthState()
  }, [restoreToken])

  if (!fontsLoaded) {
    return <Splash />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={colors.green[600]}
            translucent
          />
          <Slot />
          <Toast />
          <Redirect
            href={isAuthenticated ? '/(tabs)/demands' : '/auth/sign-in'}
          />
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
