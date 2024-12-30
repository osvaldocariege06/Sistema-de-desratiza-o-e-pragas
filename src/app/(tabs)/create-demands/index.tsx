import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native'
import React, { useState, useRef, type RefObject } from 'react'
import { CalendarIcon, MapPin, Plus, User } from 'lucide-react-native'

import type BottomSheet from '@gorhom/bottom-sheet'
import { colors } from '@/styles/colors'
import { formateDate } from '@/utils/format-date'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Calendar } from '@/components/Calendar'
import { BottomSheetOurTeam } from '@/components/bottom-sheets/OurTeam'
import { Button } from '@/components/Button'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import dayjs from 'dayjs'

type FormData = {
  clientName: string
  location: string
}

const schema = zod.object({
  clientName: zod
    .string({ required_error: 'Insira o nome do cliente!' }) // Mensagem de erro personalizada
    .min(1, { message: 'O nome do cliente é obrigatório!' }), // Verifica se não está vazio

  location: zod
    .string({ required_error: 'Onde será o local de execução?' }) // Mensagem de erro personalizada
    .min(1, { message: 'O local de execução é obrigatório!' }), // Verifica se não está vazio
})

export default function CreateDemand() {
  const [initialDate, setInitialDate] = useState<Date | string>('')
  const [endDate, setEndDate] = useState<Date | string>('')

  const [isLoading, setIsLoading] = useState(false)

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

  const locationRef = useRef<TextInput | null>(null)

  const bottomSheetRefInitialCalendar = useRef<BottomSheet>(null)
  const bottomSheetRefEndCalendar = useRef<BottomSheet>(null)

  const handleOpenInitialDateCalendar = () => {
    Keyboard.dismiss()
    bottomSheetRefInitialCalendar.current?.expand()
    bottomSheetRefEndCalendar.current?.close()
  }

  const handleOpenEndDateCalendar = () => {
    Keyboard.dismiss()
    bottomSheetRefEndCalendar.current?.expand()
    bottomSheetRefInitialCalendar.current?.close()
  }

  const bottomSheetRef = useRef<BottomSheet>(null)
  const handleOpenPress = () => bottomSheetRef.current?.expand()

  function handleRemoveUser(username: string) {
    setFilterTeam(prevState => prevState.filter(name => name !== username))
    setTeams(prevState => [...prevState, username])
  }

  const handleOnSubmitEditing = (ref: RefObject<TextInput>) => {
    if (ref?.current) {
      ref.current.focus() // Garante que `ref.current` não é null
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      clientName: '',
      location: '',
    },
  })

  function onSubmit(data: FormData) {
    Keyboard.dismiss()
    setIsLoading(true)

    if (!endDate || !initialDate) {
      return Alert.alert(
        'Data inválida',
        'Insira uma Data de abertura e data de término.'
      )
    }
    if (dayjs(endDate).isBefore(initialDate)) {
      return Alert.alert(
        'Data de término inválida',
        'Data de término não pode ser anterior a data de abertura.'
      )
    }

    if (filterTeam.length <= 0) {
      return Alert.alert(
        'Equipe técnica',
        'Selecione uma equipe para esta demanda.'
      )
    }
    try {
      console.log({
        Client: data.clientName,
        location: data.location,
        initialDate: initialDate,
        endDate: endDate,
        team: filterTeam,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          className="p-4"
        >
          <Text className="text-lg font-semibold text-zinc-800">
            Criar nova demanda
          </Text>
          <View className="gap-4 mt-8">
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2">
                    <User size={18} color={colors.zinc[500]} />
                    <TextInput
                      keyboardType="default"
                      placeholder="Digite o nome cliente"
                      placeholderTextColor={colors.zinc[400]}
                      className="flex-1 text-sm"
                      editable={!isLoading}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      returnKeyType="next"
                      onSubmitEditing={() => handleOnSubmitEditing(locationRef)}
                    />
                  </View>
                )}
                name="clientName"
              />
              {errors.clientName && (
                <Text className="text-xs text-red-800 mt-2">
                  {errors.clientName.message}
                </Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2">
                    <MapPin size={18} color={colors.zinc[500]} />
                    <TextInput
                      ref={locationRef}
                      keyboardType="default"
                      placeholder="Local de execução"
                      placeholderTextColor={colors.zinc[400]}
                      className="flex-1 text-sm"
                      editable={!isLoading}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      returnKeyType="next"
                    />
                  </View>
                )}
                name="location"
              />
              {errors.location && (
                <Text className="text-xs text-red-800 mt-2">
                  {errors.location.message}
                </Text>
              )}
            </View>

            <View className="border border-zinc-200 p-4 rounded-2xl gap-4">
              <Text className="text-sm font-semibold text-zinc-400">
                Data/Hora
              </Text>
              <View className="gap-4">
                <View className="bg-zinc-200 rounded-2xl flex-row justify-between h-14 items-center px-4 gap-2">
                  <TextInput
                    placeholder="Data de abertura"
                    className={`flex-1 text-sm ${initialDate ? 'text-zinc-600' : 'text-zinc-400'}`}
                    placeholderTextColor={colors.zinc[500]}
                    onFocus={handleOpenInitialDateCalendar}
                    value={
                      initialDate !== ''
                        ? formateDate(initialDate)
                        : 'Data de abertura'
                    }
                  />
                  <CalendarIcon size={14} color={colors.zinc[500]} />
                </View>
                <View className="bg-zinc-200 rounded-2xl flex-row justify-between h-14 items-center px-4 gap-2">
                  <TextInput
                    placeholder="Data de término"
                    className={`flex-1 text-sm ${endDate ? 'text-zinc-600' : 'text-zinc-400'}`}
                    placeholderTextColor={colors.zinc[500]}
                    onFocus={handleOpenEndDateCalendar}
                    value={
                      endDate !== '' ? formateDate(endDate) : 'Data de término'
                    }
                  />
                  <CalendarIcon size={14} color={colors.zinc[500]} />
                </View>
              </View>
            </View>

            <View className="border border-zinc-200 p-4 rounded-2xl">
              <View className=" justify-between flex-col gap-4 px-4 py-1 rounded-2xl">
                <View className=" flex-row justify-between items-center h-14 border-b border-zinc-400">
                  <Text className="text-sm text-zinc-500">Equipe técnica</Text>
                  <Pressable
                    onPress={handleOpenPress}
                    className="bg-green-600 justify-center items-center rounded-full p-1"
                  >
                    <Plus size={20} color={colors.zinc[50]} />
                  </Pressable>
                </View>
                <View className="py-2">
                  {filterTeam.length > 0 ? (
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
                  ) : (
                    <Text className="text-xs text-zinc-400 text-center">
                      Selecione os integrantes para esta demanda
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <Button variant="primary" onPress={handleSubmit(onSubmit)}>
              <Button.Title className="text-white">Cria demanda</Button.Title>
            </Button>
          </View>
        </KeyboardAwareScrollView>
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
