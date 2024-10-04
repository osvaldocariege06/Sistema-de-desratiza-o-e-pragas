import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
  TextInput,
  Alert,
  FlatList,
} from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'

import { colors } from '@/styles/colors'
import { Calendar, ChevronDown, Plus, Search } from 'lucide-react-native'
import { Demand } from '@/components/Demand'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

import { clsx } from 'clsx'

const TEAMS = []

export default function FilterDemands() {
  const [status, setStatus] = useState<'pendent' | 'running' | 'done'>(
    'pendent'
  )

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

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  )
  function handleStatus() {
    if (status === 'pendent') {
      setStatus('running')
    } else if (status === 'running') {
      setStatus('done')
    } else if (status === 'done') {
      setStatus('pendent')
    }
  }

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleOpenPress = () => bottomSheetRef.current?.expand()

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  function handleRemoveUser(username: string) {
    setFilterTeam(prevState => prevState.filter(name => name !== username))
    setTeams(prevState => [...prevState, username])
  }

  function handleAddUser(username: string) {
    const usernameAlreadyExists = filterTeam.find(name => name === username)

    if (usernameAlreadyExists) {
      return Alert.alert('Equipe técnica', 'Este membro já foi adicionado!')
    }

    setFilterTeam(prevState => [...prevState, username])
    setTeams(prevState => prevState.filter(name => name !== username))
  }

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

          <View className="flex-row items-center justify-between gap-4">
            <View className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2 flex-1">
              <Calendar size={16} color={colors.zinc[500]} />
              <TextInput
                placeholder="Data de abertura"
                placeholderTextColor={colors.zinc[400]}
                className="flex-1 text-sm"
              />
            </View>
            <View className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2 flex-1">
              <Calendar size={16} color={colors.zinc[500]} />
              <TextInput
                placeholder="Data de término"
                placeholderTextColor={colors.zinc[400]}
                className="flex-1 text-sm"
              />
            </View>
          </View>

          <View className="flex-row items-center justify-between gap-4">
            <View className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2 w-[136px]">
              <TextInput
                placeholder="N. demanda"
                placeholderTextColor={colors.zinc[400]}
                className="flex-1 text-sm"
              />
            </View>
            <Pressable
              onPress={handleStatus}
              className={clsx(
                'flex-1 justify-between items-center flex-row h-14 px-4 rounded-2xl',
                {
                  'bg-yellow-600': status === 'pendent',
                  'bg-orange-600': status === 'running',
                  'bg-green-600': status === 'done',
                }
              )}
            >
              <Text className="text-white">
                {(status === 'pendent' && 'Pendente') ||
                  (status === 'running' && 'Em andamento') ||
                  (status === 'done' && 'Concluídos')}
              </Text>
              <ChevronDown size={20} color={colors.zinc[50]} />
            </Pressable>
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
          {data.map(item => (
            <Demand key={item} />
          ))}
        </View>
      </ScrollView>
      <BottomSheet
        snapPoints={['50%']}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        index={-1}
        enablePanDownToClose={true}
      >
        <BottomSheetView className="flex-1 bg-zinc-50 p-4">
          <Text className="text-zinc-800 font-medium">Equipe técnica</Text>
          <View className="py-4 flex-row gap-4 flex-wrap">
            {teams.length > 0 ? (
              teams.map(item => (
                <Pressable
                  key={item}
                  onPress={() => handleAddUser(item)}
                  className="p-1 border border-zinc-400 rounded-2xl"
                >
                  <Text className="text-sm text-zinc-400">{item}</Text>
                </Pressable>
              ))
            ) : (
              <View className="flex-1 justify-center items-center">
                <Text className="text-sm text-zinc-500">Nenhum membro!</Text>
              </View>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  )
}
