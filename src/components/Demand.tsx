import { View, Text, Pressable } from 'react-native'
import { colors } from '@/styles/colors'
import { Calendar, Ellipsis, FlagIcon } from 'lucide-react-native'
import { Progress } from './Progress'
import { Link } from 'expo-router'
import { Avatar } from './Avatar'
import type { DemandProps } from '@/types/demands'
import { formateDate } from '@/utils/format-date'

export function Demand(props: DemandProps) {
  return (
    <Link
      href={`/(tabs)/demands/details/${props.id}`}
      className="flex-1"
      asChild
    >
      <Pressable className="border border-zinc-300 rounded-2xl p-4 mb-3">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-xs text-green-600">
              {props?.customerAddressDesignation}
              {props?.customerAddressDetails && <Text>,</Text>}{' '}
              {props?.customerAddressDetails ?? ''}
            </Text>
            <Text className="text-base text-zinc-600 font-medium tracking-wide leading-relaxed">
              {props.description}
            </Text>
          </View>
          <Pressable className="border border-zinc-300 w-6 h-6 rounded-full justify-center items-center active:scale-90 transition-transform">
            <Ellipsis size={14} color={colors.zinc[500]} />
          </Pressable>
        </View>

        <View className="mt-2 max-w-[167px]">
          <Text className="text-sm text-zinc-400">Progresso</Text>
          <View className="flex-row gap-2 items-center">
            <Progress
              value={props?.status === 0 ? 0 : props?.status === 1 ? 50 : 100}
              className=" bg-green-600 h-2"
            />
            <Text className="text-sm text-zinc-400">
              {props?.status === 0 ? 0 : props?.status === 1 ? 50 : 100}%
            </Text>
          </View>
        </View>

        {/* DATES */}
        <View className="mt-2 flex-row gap-4 items-center">
          <View className="flex-row gap-2 items-center">
            <Calendar size={18} color={colors.green[600]} />
            <Text className="text-sm text-zinc-500">
              {formateDate(props?.workBeginDate)}
            </Text>
          </View>
          <View className="flex-row gap-2 items-center">
            <FlagIcon size={18} color={colors.green[600]} />
            <Text className="text-sm text-zinc-500">
              {formateDate(props.workEndDate)}
            </Text>
          </View>
        </View>

        {/* TEAMS AND STATUS */}
        <View className="mt-3 flex-row gap-4 items-center justify-between">
          <View className="flex-row">
            {/* {props.team?.map((member, index) => (
              <Avatar
                key={member.name}
                fallback={member.name}
                src={member.avatarUrl}
                marginLeft={index === 0 ? 0 : -10}
                className={member.backgroundColor}
              />
            ))} */}
          </View>

          <View
            className={`rounded-2xl px-4 py-1
            ${
              props?.status === 0
                ? 'bg-yellow-600'
                : props?.status === 1
                  ? 'bg-orange-600'
                  : 'bg-green-600'
            }
            `}
          >
            <Text className="text-sm text-white">
              {props?.status === 0
                ? 'Pendente'
                : props?.status === 1
                  ? 'Andamento'
                  : 'Concluído'}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
