import { StatusBar, Text, View } from 'react-native'
import { Slot, Redirect } from 'expo-router'
import '../styles/global.css'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins'
import Splash from '@/components/Splash'
import { useEffect } from 'react'

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
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Slot />
      <Redirect href={'/auth/sign-in'} />
    </>
  )
}
