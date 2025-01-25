import { View, Text, Pressable } from 'react-native'
import { colors } from '@/styles/colors'
import { Calendar, Ellipsis } from 'lucide-react-native'
import { Progress } from './Progress'
import { Link } from 'expo-router'
import { Avatar } from './Avatar'
import type { DemandProps } from '@/types/demands'

const statusConfig = {
  pending: {
    color: 'bg-yellow-600',
    label: 'Pendente'
  },
  in_progress: {
    color: 'bg-blue-600',
    label: 'Em Andamento'
  },
  completed: {
    color: 'bg-green-600',
    label: 'Concluído'
  },
  cancelled: {
    color: 'bg-red-600',
    label: 'Cancelado'
  }
} as const

export function Demand(props: DemandProps) {
  const status = statusConfig[props.status]

  return (
    <Link href={`/(tabs)/demands/details/${props.id}`} className="flex-1" asChild>
      <Pressable className="border border-zinc-300 rounded-2xl p-4 mb-3">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-xs text-green-600">{props.customerName}</Text>
            <Text className="text-base text-zinc-600 font-medium tracking-wide leading-relaxed">
              {props.location}
            </Text>
          </View>
          <Pressable className="border border-zinc-300 w-6 h-6 rounded-full justify-center items-center active:scale-90 transition-transform">
            <Ellipsis size={14} color={colors.zinc[500]} />
          </Pressable>
        </View>

        <View className="mt-2 max-w-[167px]">
          <Text className="text-sm text-zinc-400">Progresso</Text>
          <View className="flex-row gap-2 items-center">
            <Progress value={props.progress} className=" bg-green-600 h-2" />
            <Text className="text-sm text-zinc-400">{props.progress}%</Text>
          </View>
        </View>

        {/* DATES */}
        <View className="mt-2 flex-row gap-4 items-center">
          <View className="flex-row gap-2 items-center">
            <Calendar size={18} color={colors.zinc[500]} />
            <Text className="text-sm text-zinc-500">{props.startDate}</Text>
          </View>
          <View className="flex-row gap-2 items-center">
            <Calendar size={18} color={colors.zinc[500]} />
            <Text className="text-sm text-zinc-500">{props.endDate}</Text>
          </View>
        </View>

        {/* TEAMS AND STATUS */}
        <View className="mt-3 flex-row gap-4 items-center justify-between">
          <View className="flex-row">
            {props.team?.map((member, index) => (
              <Avatar
                key={member.name}
                fallback={member.name}
                src={member.avatarUrl}
                marginLeft={index === 0 ? 0 : -10}
                className={member.backgroundColor}
              />
            ))}
          </View>

          <View className={`${status.color} rounded-2xl px-4 py-1`}>
            <Text className="text-sm text-white">
              {status.label}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
