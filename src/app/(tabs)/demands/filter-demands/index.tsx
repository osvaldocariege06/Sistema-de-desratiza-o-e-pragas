import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
  TextInput,
  Alert,
} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { colors } from '@/styles/colors'
import { Calendar as CalendarIcon, Plus, Search } from 'lucide-react-native'
import { Demand } from '@/components/Demand'
import type BottomSheet from '@gorhom/bottom-sheet'

import { Calendar } from '@/components/Calendar'
import { formateDate } from '@/utils/format-date'
import { BottomSheetOurTeam } from '@/components/bottom-sheets/OurTeam'
import { ButtonStatus } from '@/components/ButtonStatus'

export default function FilterDemands() {
  const [status, setStatus] = useState<'pendent' | 'running' | 'done'>(
    'pendent'
  )
  const [initialDate, setInitialDate] = useState<Date | string>('')
  const [endDate, setEndDate] = useState<Date | string>('')

  const [filterTeam, setFilterTeam] = useState<string[]>([])
  const [teams, setTeams] = useState([
    'João Silva',
    'Maria Oliveira',
    'Carlos Souza',
    'Ana Pereira',
    'Roberto Lima',
    'Fernanda Costa',
    'Paulo Henrique',
    'Juliana Almeida',
  ])

  // const data = useMemo(
  //   () =>
  //     Array(10)
  //       .fill(0)
  //       .map((_, index) => `index-${index}`),
  //   []
  // )

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null)
  const handleOpenPress = () => bottomSheetRef.current?.expand()

  const bottomSheetRefInitialCalendar = useRef<BottomSheet>(null)
  const bottomSheetRefEndCalendar = useRef<BottomSheet>(null)

  const handleOpenInitialDateCalendar = () =>
    bottomSheetRefInitialCalendar.current?.expand()
  bottomSheetRefEndCalendar.current?.close()

  const handleOpenEndDateCalendar = () =>
    bottomSheetRefEndCalendar.current?.expand()
  bottomSheetRefInitialCalendar.current?.close()

  function handleRemoveUser(username: string) {
    setFilterTeam(prevState => prevState.filter(name => name !== username))
    setTeams(prevState => [...prevState, username])
  }

  useEffect(() => {
    if (endDate < initialDate) {
      return Alert.alert('Invalid date')
    }
  }, [endDate, initialDate])

  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        backgroundColor={'#086632'}
        barStyle={'dark-content'}
        translucent
      />
      <ScrollView>
        <View className="p-4 gap-3">
          <View className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2">
            <Search size={16} color={colors.zinc[500]} />
            <TextInput
              placeholder="Pesquisar por demandas"
              placeholderTextColor={colors.zinc[400]}
              className="flex-1 text-sm"
            />
          </View>

          <View className="relative flex-row items-center justify-between gap-4">
            <Pressable
              onPress={handleOpenInitialDateCalendar}
              className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2 flex-1"
            >
              <CalendarIcon size={14} color={colors.zinc[500]} />
              <Text className="text-sm text-zinc-500">
                {initialDate !== ''
                  ? formateDate(initialDate)
                  : 'Data de abertura'}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleOpenEndDateCalendar}
              className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2 flex-1"
            >
              <CalendarIcon size={14} color={colors.zinc[500]} />
              <Text className="text-sm text-zinc-500">
                {endDate !== '' ? formateDate(endDate) : 'Data de término'}
              </Text>
            </Pressable>
          </View>

          <View className="flex-row items-center justify-between gap-4">
            <View className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2 w-[136px]">
              <TextInput
                placeholder="N. demanda"
                placeholderTextColor={colors.zinc[400]}
                className="flex-1 text-sm"
              />
            </View>
            <ButtonStatus status={status} setStatus={setStatus} />
          </View>

          <View className="bg-zinc-200 justify-between flex-col gap-4 px-4 py-1 rounded-2xl">
            <View className=" flex-row justify-between items-center h-14">
              <Text className="text-sm text-zinc-500">Equipe técnica</Text>
              <Pressable
                onPress={handleOpenPress}
                className="bg-white justify-center items-center rounded-full p-2"
              >
                <Plus size={20} color={colors.zinc[500]} />
              </Pressable>
            </View>
            {filterTeam.length > 0 && (
              <View>
                {filterTeam.length > 0 && (
                  <View className="flex-row gap-1 items-center flex-wrap">
                    {filterTeam.map(team => (
                      <Pressable
                        key={team}
                        onPress={() => handleRemoveUser(team)}
                        className="p-1 bg-green-600 rounded-2xl"
                      >
                        <Text className="text-sm text-zinc-100">{team}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        </View>

        {/* DEMANDS LIST */}
        <View className="flex-col gap-4 p-4">
          {data.map((item, key) => (
            <Demand key={item} />
          ))}
        </View>
      </ScrollView>
      <Calendar
        selected={initialDate}
        setSelected={setInitialDate}
        bottomSheetRefInitialCalendar={bottomSheetRefInitialCalendar}
      />
      <Calendar
        selected={endDate}
        setSelected={setEndDate}
        bottomSheetRefInitialCalendar={bottomSheetRefEndCalendar}
      />
      <BottomSheetOurTeam
        bottomSheetRef={bottomSheetRef}
        teams={teams}
        setTeams={setTeams}
        setFilterTeam={setFilterTeam}
      />
    </SafeAreaView>
  )
}
