import { View, Text, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import type { DemandProps } from '@/types/demands'
import {
  CalendarIcon,
  CarFrontIcon,
  HomeIcon,
  MapPinIcon,
  PencilLineIcon,
  User,
  UserIcon,
  UsersIcon,
} from 'lucide-react-native'
import { colors } from '@/styles/colors'

import { Avatar } from '@/components/Avatar'
import dayjs from 'dayjs'
import { formateDate } from '@/utils/format-date'
import type BottomSheet from '@gorhom/bottom-sheet'

interface Props {
  props?: DemandProps
}

export default function DemandDetails({ props }: Props) {
  const bottomSheetRefCompartment = useRef<BottomSheet>(null)
  const bottomSheetRefCars = useRef<BottomSheet>(null)

  const bottomSheetRefAddCompartment = useRef<BottomSheet>(null)
  const bottomSheetRefAddCar = useRef<BottomSheet>(null)

  function handleOpenCompartment() {
    bottomSheetRefCompartment.current?.expand()
  }

  function handleOpenCars() {
    bottomSheetRefCars.current?.expand()
  }

  const handleOpenAddCompartment = () =>
    bottomSheetRefAddCompartment.current?.expand()

  const [moreOptions, setMoreOptions] = useState<'compartments' | 'cars'>(
    'compartments'
  )

  return (
    <View className="gap-3 py-4">
      <View className="border border-zinc-200 p-3 rounded-2xl">
        <View className="flex-row items-center gap-2">
          <UserIcon size={16} color={colors.zinc[500]} />
          <Text className="text-sm text-zinc-500">Cliente</Text>
        </View>
        <Text
          className="text-sm font-semibold text-green-600 ml-4"
          lineBreakMode="tail"
          numberOfLines={1}
        >
          {props?.customer || ''}
        </Text>
      </View>

      <View className="border border-zinc-200 p-3 rounded-2xl">
        <View className="flex-row items-center gap-2">
          <MapPinIcon size={16} color={colors.zinc[500]} />
          <Text className="text-sm text-zinc-500">Localização</Text>
        </View>
        <Text
          className="text-sm font-semibold text-green-600 ml-4"
          lineBreakMode="tail"
          numberOfLines={1}
        >
          {props?.customerAddressDetails || ''}
        </Text>
      </View>

      <View className="border border-zinc-200 p-3 rounded-2xl">
        <View className="flex-row items-center gap-2">
          <CalendarIcon size={16} color={colors.zinc[500]} />
          <Text className="text-sm text-zinc-500">Data e Hora</Text>
        </View>
        <View className="flex-row gap-1 items-center mt-2">
          <Text className="text-sm text-zinc-500 ml-4">Prevista:</Text>
          <Text className="text-sm font-semibold text-green-600">
            {formateDate(dayjs(props?.expectedDate || '').toDate())}
          </Text>
        </View>
        <View className="flex-row gap-1 items-center mt-2">
          <Text className="text-sm text-zinc-500 ml-4">
            Hora de Saída da base:
          </Text>
          <Text className="text-sm font-semibold text-green-600">
            {formateDate(dayjs(props?.workEndDate).add(10, 'days').toDate())}
          </Text>
        </View>
        <View className="flex-row gap-1 items-center mt-2">
          <Text className="text-sm text-zinc-500 ml-4">
            Hora de chegada ao cliente:
          </Text>
          <Text className="text-sm font-semibold text-green-600">
            {formateDate(dayjs(props?.workBeginDate).add(10, 'days').toDate())}
          </Text>
        </View>
        <View className="flex-row gap-1 items-center mt-2">
          <Text className="text-sm text-zinc-500 ml-4">
            Início de execução:
          </Text>
          <Text className="text-sm font-semibold text-green-600">
            {formateDate(dayjs(props?.workBeginDate).add(10, 'days').toDate())}
          </Text>
        </View>

        <View className="flex-row gap-1 items-center mt-2">
          <Text className="text-sm text-zinc-500 ml-4">Término:</Text>
          <Text className="text-sm font-semibold text-green-600">
            {formateDate(dayjs(props?.requestDate).add(1, 'M').toDate())}
          </Text>
        </View>
      </View>

      <View className="border border-zinc-200 p-3 rounded-2xl">
        <View className="flex-row items-center gap-2">
          <User size={16} color={colors.zinc[500]} />
          <Text className="text-sm text-zinc-500">
            Técnico responsável do cliente:
          </Text>
        </View>
        <Text className="text-sm font-semibold text-green-600 ml-4">
          {props?.technicianId || ''}
        </Text>
      </View>

      <View className="border border-zinc-200 p-3 rounded-2xl">
        <View className="flex-row items-center gap-2">
          <UsersIcon size={16} color={colors.zinc[500]} />
          <Text className="text-sm text-zinc-500">Equipa Tecnica</Text>
        </View>
        <View className="flex-row mt-3">
          <Avatar src="/" fallback="Bertha Guzman" className="bg-violet-600 " />
          <Avatar
            src="/"
            marginLeft={-10}
            fallback="Lester Parks"
            className="bg-yellow-600 "
          />
          <Avatar
            src="/"
            marginLeft={-10}
            fallback="Chase Arnold"
            className="bg-blue-600 "
          />
          <Avatar
            src="/"
            marginLeft={-10}
            fallback="Ricardo Jefferson"
            className="bg-orange-600 "
          />
        </View>
      </View>

      <View className="mb-10">
        <View className="mt-4 justify-between items-center flex-row">
          <Pressable
            onPress={() => setMoreOptions('compartments')}
            className={`flex-1  py-1 text-center justify-center items-center ${moreOptions === 'compartments' && 'border-b border-green-600'}`}
          >
            <Text
              className={`text-sm ${moreOptions === 'compartments' ? 'text-green-600 font-medium' : 'text-zinc-400'}`}
            >
              Compartimentos
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMoreOptions('cars')}
            className={`flex-1  py-1 text-center justify-center items-center ${moreOptions === 'cars' && 'border-b border-green-600'}`}
          >
            <Text
              className={`text-sm ${moreOptions === 'cars' ? 'text-green-600 font-medium' : 'text-zinc-400'}`}
            >
              Viaturas
            </Text>
          </Pressable>
        </View>

        {moreOptions === 'compartments' && (
          <View className="flex-row flex-wrap gap-4 mt-8 border border-zinc-200 p-4 rounded-2xl">
            <Pressable
              onPress={handleOpenCompartment}
              className="w-[150px] h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
            >
              <HomeIcon size={60} color={colors.green[600]} />
              <Text className="text-green-600">Quarto</Text>
            </Pressable>
            <Pressable
              onPress={handleOpenCompartment}
              className="w-[150px] h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
            >
              <HomeIcon size={60} color={colors.green[600]} />
              <Text className="text-green-600">Dispensa</Text>
            </Pressable>
            <Pressable
              onPress={handleOpenCompartment}
              className="w-[150px]  h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
            >
              <HomeIcon size={60} color={colors.green[600]} />
              <Text className="text-green-600">WC</Text>
            </Pressable>
          </View>
        )}

        {moreOptions === 'cars' && (
          <View className="flex-row flex-wrap gap-4 mt-8 border border-zinc-200 p-4 rounded-2xl">
            <Pressable
              onPress={handleOpenCars}
              className="w-[150px] h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
            >
              <CarFrontIcon size={60} color={colors.green[600]} />
              <Text className="text-green-600">BMW</Text>
            </Pressable>
            <Pressable
              onPress={handleOpenCars}
              className="w-[150px] h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
            >
              <CarFrontIcon size={60} color={colors.green[600]} />
              <Text className="text-green-600">KIA i20</Text>
            </Pressable>
            <Pressable
              onPress={handleOpenCars}
              className="w-[150px]  h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
            >
              <CarFrontIcon size={60} color={colors.green[600]} />
              <Text className="text-green-600">Autocarro</Text>
            </Pressable>
            <Pressable
              onPress={handleOpenCars}
              className="w-[150px]  h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
            >
              <CarFrontIcon size={60} color={colors.green[600]} />
              <Text className="text-green-600">Ranger Over</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View className="border border-zinc-200 p-3 rounded-2xl">
        <View className="flex-row items-center gap-2">
          <PencilLineIcon size={16} color={colors.zinc[500]} />
          <Text className="text-sm text-zinc-500">Assinatura QSA</Text>
        </View>
        <View className="flex-row gap-1 items-center mt-2">
          <Text className="text-sm text-zinc-500 ml-4">Responsavel:</Text>
          <Text className="text-sm font-semibold text-green-600">
            Agnes James
          </Text>
        </View>
        <View className="flex-row gap-1 items-center mt-2">
          <Text className="text-sm text-zinc-500 ml-4">Data:</Text>
          <Text className="text-sm font-semibold text-green-600">
            {formateDate(dayjs().add(1, 'M').toDate())}
          </Text>
        </View>
        <View className="flex-row gap-1 items-center mt-2">
          <Text className="text-sm text-zinc-500 ml-4">Assinatura:</Text>
          <View className="border-b border-green-600">
            <Text className="text-sm font-semibold text-green-600">
              Agnes James
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
