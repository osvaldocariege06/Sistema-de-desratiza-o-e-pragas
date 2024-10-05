import { View, Text, Pressable } from 'react-native'
import { colors } from '@/styles/colors'
import { Calendar, Ellipsis } from 'lucide-react-native'
import { Progress } from './Progress'
import { Link } from 'expo-router'
import { Avatar } from './Avatar'

export function Demand() {
  return (
    <Link href={'/(tabs)/demands/details/[id]'} className="flex-1" asChild>
      <Pressable className="border border-zinc-300 rounded-2xl p-4 mb-3">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-xs text-green-600">Luanda, KM 30, rua G</Text>
            <Text className="text-base text-zinc-600 font-medium tracking-wide leading-relaxed">
              Desratização em galpão
            </Text>
          </View>
          <Pressable className="border border-zinc-300 w-6 h-6 rounded-full justify-center items-center active:scale-90 transition-transform">
            <Ellipsis size={14} color={colors.zinc[500]} />
          </Pressable>
        </View>

        <View className="mt-2 max-w-[167px]">
          <Text className="text-sm text-zinc-400">Progresso</Text>
          <View className="flex-row gap-2 items-center">
            <Progress value={50} className=" bg-green-600 h-2" />
            <Text className="text-sm text-zinc-400">50%</Text>
          </View>
        </View>

        {/* DATES */}
        <View className="mt-2 flex-row gap-4 items-center">
          <View className="flex-row gap-2 items-center">
            <Calendar size={18} color={colors.zinc[500]} />
            <Text className="text-sm text-zinc-500">{'12 Jan 2023'}</Text>
          </View>
          <View className="flex-row gap-2 items-center">
            <Calendar size={18} color={colors.zinc[500]} />
            <Text className="text-sm text-zinc-500">{'20 Mar 2023'}</Text>
          </View>
        </View>

        {/* TEAMS AND STATUS */}
        <View className="mt-3 flex-row gap-4 items-center justify-between">
          <View className="flex-row">
            <Avatar
              fallback="Osvaldo Cariege"
              src="/"
              className="bg-violet-600"
            />
            <Avatar
              fallback="Peter Weber"
              src="/"
              marginLeft={-10}
              className="bg-yellow-600 "
            />
            <Avatar
              fallback="Bernard Fowler"
              src="/"
              marginLeft={-10}
              className="bg-red-600"
            />
            <Avatar
              fallback="Walter Mullins"
              src="/"
              marginLeft={-10}
              className="bg-green-600"
            />
          </View>

          <View className="bg-yellow-600 rounded-2xl px-4 py-1">
            <Text className="text-sm text-white">Pendente</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
