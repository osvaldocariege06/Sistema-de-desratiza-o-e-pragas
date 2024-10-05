import { StatusBar, Text, View } from 'react-native'
import { Slot, Redirect } from 'expo-router'
import '../styles/global.css'
import '@/utils/dayjs-config'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins'
import Splash from '@/components/Splash'
import { colors } from '@/styles/colors'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  })

  if (!fontsLoaded) {
    return <Splash />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={colors.green[600]}
        translucent
      />
      <Slot />
      <Redirect href={'/auth/sign-in'} />
    </GestureHandlerRootView>
  )
}
