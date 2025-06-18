import { View, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Pressable } from 'react-native'
import { Car, InfoIcon, PencilLine, Plus, User } from 'lucide-react-native'
import { colors } from '@/styles/colors'
import { TextInput } from 'react-native'
import { Keyboard } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { Button } from '@/components/Button'

interface Cars {
  motorista: string
  marca: string
  Modelo: string
  matricula: string
}

interface EditDemandProps {
  handleOpenAddCars: () => void
}

export function EditDemand({ handleOpenAddCars }: EditDemandProps) {
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

  function handleRemoveUser(username: string) {
    setFilterTeam(prevState => prevState.filter(name => name !== username))
    setTeams(prevState => [...prevState, username])
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" className="">
      <View className="gap-5 p-4">
        <Text className="text-lg font-medium text-zinc-600">
          Informações para técnicos
        </Text>
        <View className="border border-zinc-200 rounded-2xl">
          <View className=" justify-between flex-col gap-4 px-4 py-1 rounded-2xl">
            <View className=" flex-row justify-between items-center h-14 border-b border-zinc-400">
              <Text className="text-sm text-zinc-500">
                Em caso de Intervenção em viaturas
              </Text>
              <Pressable
                onPress={handleOpenAddCars}
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
                  Nenhuma viatura
                </Text>
              )}
            </View>
          </View>
        </View>

        <View className="border border-zinc-200 rounded-2xl">
          <View className=" justify-between flex-col gap-4 px-4 py-1 rounded-2xl">
            <View className=" flex-row justify-between items-center h-14 border-b border-zinc-400">
              <Text className="text-sm text-zinc-500">
                Compartimentos/Perímetros
              </Text>
              <Pressable className="bg-green-600 justify-center items-center rounded-full p-1">
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
                  Nenhum compartimento
                </Text>
              )}
            </View>
          </View>
        </View>

        <View className="border border-zinc-200 p-3 rounded-2xl">
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-zinc-500 font-medium">
              Assinaturas
            </Text>
          </View>
          <View className="bg-zinc-200 rounded-2xl flex-row h-14 items-center px-4 gap-2 mt-4">
            <User size={16} color={colors.zinc[500]} />
            <TextInput
              placeholder="Responsavel QSA"
              placeholderTextColor={colors.zinc[400]}
              className="flex-1 text-sm"
            />
          </View>

          <View className="bg-zinc-50 border-b border-zinc-400 flex-row h-14 items-center px-4 gap-2 mt-4">
            <PencilLine size={16} color={colors.zinc[500]} />
            <TextInput
              placeholder="Assinatura QSA"
              placeholderTextColor={colors.zinc[400]}
              className="flex-1 text-sm"
              onFocus={() => Keyboard.dismiss()}
            />
          </View>
          <View className="bg-zinc-50 border-b border-zinc-400 flex-row h-14 items-center px-4 gap-2 mt-4">
            <PencilLine size={16} color={colors.zinc[500]} />
            <TextInput
              placeholder="Assinatura responsável cliente"
              placeholderTextColor={colors.zinc[400]}
              className="flex-1 text-sm"
              onFocus={() => Keyboard.dismiss()}
            />
          </View>
        </View>
        <View className="border border-zinc-200 p-3 rounded-2xl">
          <Text className="text-sm text-zinc-500 font-medium">Ocorrências</Text>
          <View className="bg-zinc-200 rounded-2xl flex-row min-h-28 items-start px-4 gap-2 mt-4">
            <View className="h-14 justify-center items-center">
              <InfoIcon size={16} color={colors.zinc[500]} />
            </View>
            <TextInput
              placeholder="Insira uma ocorrências"
              placeholderTextColor={colors.zinc[400]}
              multiline={true}
              className="flex-1 text-sm min-h-14 py-3"
            />
          </View>
        </View>
        <View className="border border-zinc-200 p-3 rounded-2xl">
          <Text className="text-sm text-zinc-500 font-medium">
            Inconformidades
          </Text>
          <View className="bg-zinc-200 rounded-2xl flex-row min-h-28 items-start px-4 gap-2 mt-4">
            <View className="h-14 justify-center items-center">
              <InfoIcon size={16} color={colors.zinc[500]} />
            </View>
            <TextInput
              placeholder="Insira uma inconformidades"
              placeholderTextColor={colors.zinc[400]}
              multiline={true}
              className="flex-1 text-sm min-h-14 py-3"
            />
          </View>
        </View>
        <View className="border border-zinc-200 p-3 rounded-2xl">
          <Text className="text-sm text-zinc-500 font-medium">Notas</Text>
          <View className="bg-zinc-200 rounded-2xl flex-row min-h-28 items-start px-4 gap-2 mt-4">
            <View className="h-14 justify-center items-center">
              <InfoIcon size={16} color={colors.zinc[500]} />
            </View>
            <TextInput
              placeholder="Insira uma observação"
              placeholderTextColor={colors.zinc[400]}
              multiline={true}
              className="flex-1 text-sm min-h-14 py-3"
            />
          </View>
        </View>
        <Button
          variant="primary"
        // onPress={handleSubmit(onSubmit)}
        >
          <Button.Title className="text-white">Gravar/Confirmar</Button.Title>
        </Button>
      </View>
    </KeyboardAwareScrollView>
  )
}
