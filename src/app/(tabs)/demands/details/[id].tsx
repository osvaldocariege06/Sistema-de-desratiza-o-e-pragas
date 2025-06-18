import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useLocalSearchParams } from 'expo-router'
import {
  Bug,
  Car,
  CarFront,
  Home,
  ListCheck,
  Pickaxe,
  User,
} from 'lucide-react-native'
import { colors } from '@/styles/colors'

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { EditDemand } from '@/components/demands/EditDemand'
import { useDemandsStore } from '@/stores/demandsStore'
import DemandDetails from '@/components/demands/DemandDetails'
import type { DemandProps } from '@/types/demands'
import DemandToggleBtn from '@/components/demands/DemandToggleBtn'
import DemandStatus from '@/components/demands/DemandStatus'
import DemandAnexos from '@/components/demands/DemandAnexos'

export default function Info() {
  const { id } = useLocalSearchParams<{ id: string }>()

  // const {
  //   demands,
  //   filterHeight,
  //   filteredDemands,
  //   isKeyboardVisible,
  //   isLoading,
  //   error,
  //   searchQuery,
  //   selectedFilter,
  //   setSearchQuery,
  //   setSelectedFilter,
  //   getAllDemands,
  // } = useDemands()

  const { demands, getDemandById } = useDemandsStore()

  const [options, setOptions] = useState<
    'details' | 'status' | 'files' | 'edit'
  >('details')

  const bottomSheetRefCompartment = useRef<BottomSheet>(null)
  const bottomSheetRefCars = useRef<BottomSheet>(null)

  const bottomSheetRefAddCompartment = useRef<BottomSheet>(null)
  const bottomSheetRefAddCar = useRef<BottomSheet>(null)

  const handleOpenAddCars = () => bottomSheetRefAddCar.current?.expand()

  const [demandData, setDemandData] = useState<DemandProps>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchDemand() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getDemandById(id)
        setDemandData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar demanda')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchDemand()
    }
  }, [id, getDemandById])
  console.log('demandData', demandData)

  useEffect(() => {
    bottomSheetRefAddCompartment.current?.close()
    bottomSheetRefAddCar.current?.close()
  }, [])

  return (
    <ScrollView className="flex-1">
      <View className="flex-col gap-7">
        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator />
            <Text className="text-center text-zinc-500">Carregando...</Text>
          </View>
        )}
        {error && <Text className="text-center text-red-500">{error}</Text>}
        {demandData && (
          <View className="mt-8 p-4 flex flex-col gap-y-4">
            <Text
              className="text-xl font-semibold"
              lineBreakMode="tail"
              numberOfLines={2}
            >
              {demandData?.description || ''}
            </Text>

            <DemandToggleBtn options={options} setOptions={setOptions} />

            {/* DETAILS */}
            {options === 'details' && <DemandDetails props={demandData} />}

            {/* STATUS */}
            {options === 'status' && <DemandStatus props={demandData} />}

            {/* ANEXOS */}
            {options === 'files' && <DemandAnexos props={demandData} />}
          </View>
        )}

        {/* COMPARTMENTS */}
        <BottomSheet
          snapPoints={['45%']}
          ref={bottomSheetRefCompartment}
          index={-1}
          enablePanDownToClose={true}
        >
          <BottomSheetView className="flex-1 bg-zinc-50 gap-3 p-4">
            <View className="justify-center items-center">
              <Home size={120} color={colors.green[600]} />
            </View>
            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <Bug size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">
                  Pragas identificadas
                </Text>
              </View>
              <Text className="text-sm font-semibold text-green-600 ml-4">
                Ratazanas e Baratas
              </Text>
            </View>
            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <ListCheck size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">
                  Serviços realizados
                </Text>
              </View>
              <Text className="text-sm font-semibold text-green-600 ml-4">
                Desinfestação
              </Text>
            </View>
            <View className="border border-zinc-200 p-3 rounded-2xl mb-0">
              <View className="flex-row items-center gap-2">
                <Pickaxe size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">
                  Produtos utilizados
                </Text>
              </View>
              <View className="justify-between items-center flex-row mt-2 py-2 border-b border-green-600">
                <Text className="text-sm font-semibold text-green-600 ml-4">
                  Produto
                </Text>
                <Text className="text-sm font-semibold text-green-600 ml-4">
                  Quantidade
                </Text>
              </View>
              <View className="justify-between items-center flex-row p-2">
                <Text className="text-sm font-semibold text-zinc-500">
                  Enchadas
                </Text>
                <Text className="text-sm font-semibold text-zinc-500 ">3</Text>
              </View>
              <View className="justify-between items-center flex-row p-2">
                <Text className="text-sm font-semibold text-zinc-500">
                  Catanas
                </Text>
                <Text className="text-sm font-semibold text-zinc-500 ">4</Text>
              </View>
              <View className="justify-between items-center flex-row p-2">
                <Text className="text-sm font-semibold text-zinc-500">
                  Alicate
                </Text>
                <Text className="text-sm font-semibold text-zinc-500 ">2</Text>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>

        {/* CARS */}
        <BottomSheet
          snapPoints={['45%']}
          ref={bottomSheetRefCars}
          index={-1}
          enablePanDownToClose={true}
        >
          <BottomSheetView className="flex-1 bg-zinc-50 gap-3 p-4">
            <View className="justify-center items-center">
              <Car size={120} color={colors.green[600]} />
            </View>
            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <User size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">Motorista</Text>
              </View>
              <Text className="text-sm font-semibold text-green-600 ml-4">
                John Doe
              </Text>
            </View>
            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <CarFront size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">Marca</Text>
              </View>
              <Text className="text-sm font-semibold text-green-600 ml-4">
                KIA
              </Text>
            </View>
            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <Car size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">Modelo</Text>
              </View>
              <Text className="text-sm font-semibold text-green-600 ml-4">
                I20
              </Text>
            </View>
            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <CarFront size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">Matricula</Text>
              </View>
              <Text className="text-sm font-semibold text-green-600 ml-4">
                LD-54-63-AO
              </Text>
            </View>
          </BottomSheetView>
        </BottomSheet>
        {/* EDIT DEMAND */}
        {options === 'status' && (
          <EditDemand handleOpenAddCars={handleOpenAddCars} />
        )}
        {/* CAR */}
        <BottomSheet
          snapPoints={['45%']}
          ref={bottomSheetRefAddCar}
          index={-1}
          enablePanDownToClose={true}
        >
          <BottomSheetView className="flex-1 bg-zinc-50 gap-3 p-4">
            <View className="justify-center items-center">
              <Car size={120} color={colors.green[600]} />
            </View>
            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <User size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">Motorista</Text>
              </View>
              <Text className="text-sm font-semibold text-green-600 ml-4">
                John Doe
              </Text>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </ScrollView>
  )
}
