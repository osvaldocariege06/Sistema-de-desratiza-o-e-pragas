import { View, Text } from 'react-native'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { BellDot } from 'lucide-react-native'
import { Link } from 'expo-router'

interface DemandsHeaderProps {
  username?: string
}

export function DemandsHeader({ username }: DemandsHeaderProps) {
  return (
    <View className="h-20 bg-green-600 flex-row justify-between items-center px-4">
      <View className="flex-row items-center gap-2">
        <Avatar className="bg-[#F0C274] h-12 w-12 rounded-full justify-center items-center">
          <AvatarImage src={'/'} />
          <AvatarFallback>
            <Text className="text-sm text-white">JD</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Text className="text-[10px] text-white font-regular">Bem-vindo!</Text>
          <Text className="text-sm text-white font-semibold tracking-wide">
            {username}
          </Text>
        </View>
      </View>

      <Link href={'/(tabs)/demands/notification'}>
        <BellDot size={24} color={'#FFF'} />
      </Link>
    </View>
  )
} 