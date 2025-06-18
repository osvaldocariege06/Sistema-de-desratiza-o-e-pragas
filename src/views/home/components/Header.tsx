import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Link } from 'expo-router'
import { BellDotIcon } from 'lucide-react-native'
import { IUser } from '@/types/user'
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Props = {
  user?: IUser
}

export default function Header({ user }: Props) {

  const { top } = useSafeAreaInsets()

  return (
    <View style={{
      paddingTop: top,
    }} className="h bg-green-600 flex-row justify-between items-center p-4">
      <StatusBar barStyle={"light-content"} />
      <View className="flex-row items-center gap-2">
        <Avatar className="bg-[#F0C274] h-12 w-12 rounded-full justify-center items-center">
          <AvatarImage src={'/'} />
          <AvatarFallback>
            <Text className="text-sm text-white">JD</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Text className="text-[10px] text-white font-regular">
            Bem-vindo!
          </Text>
          <Text className="text-sm text-white font-semibold tracking-wide">
            {user?.username}
          </Text>
        </View>
      </View>

      <Link href={'/(tabs)/demands/notification'}>
        <BellDotIcon size={24} color={'#FFF'} />
      </Link>
    </View>
  )
}