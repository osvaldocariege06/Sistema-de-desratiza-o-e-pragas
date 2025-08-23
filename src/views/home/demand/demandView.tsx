import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import DemandDetails from './components/DemandDetails'
import DemandStatus from './components/DemandStatus'
import DemandAnexos from './components/DemandAnexos'
import {
  BugIcon,
  CarFrontIcon,
  CarIcon,
  Edit2Icon,
  HomeIcon,
  ListCheckIcon,
  PickaxeIcon,
  Trash,
  UserIcon,
} from 'lucide-react-native'
import { colors } from '@/styles/colors'
import { router, useLocalSearchParams } from 'expo-router'
import DemandToggleBtn from './components/DemandToggleBtn'
import { useApiGetDemandById } from '../api/use-api-get-demands-id/useApiGetDemandById'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function DemandView() {
  const { bottom } = useSafeAreaInsets()

  const { id } = useLocalSearchParams<{ id: string }>()

  const { demand, isLoadingDemand, errorDemand } = useApiGetDemandById(id)

  const [options, setOptions] = useState<
    'details' | 'status' | 'files' | 'edit'
  >('details')

  // const bottomSheetRefCompartment = useRef<BottomSheet>(null)
  // const bottomSheetRefCars = useRef<BottomSheet>(null)

  // const bottomSheetRefAddCompartment = useRef<BottomSheet>(null)
  // const bottomSheetRefAddCar = useRef<BottomSheet>(null)

  // const handleOpenAddCars = () => bottomSheetRefAddCar.current?.expand()

  return (
    <View>
      <ScrollView className="h-full" style={{ paddingBottom: bottom }}>
        <View className="flex-col gap-7" style={{ paddingBottom: bottom + 50 }}>
          {isLoadingDemand && (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator />
              <Text className="text-center text-zinc-500">Carregando...</Text>
            </View>
          )}
          {errorDemand && (
            <Text className="text-center text-red-500">
              {errorDemand?.message}
            </Text>
          )}
          {demand && (
            <View className="mt-8 p-4 flex flex-col gap-y-4">
              <Text
                className="text-xl font-semibold"
                lineBreakMode="tail"
                numberOfLines={2}
              >
                {demand?.description || ''}
              </Text>

              <DemandToggleBtn options={options} setOptions={setOptions} />

              {/* DETAILS */}
              {options === 'details' && <DemandDetails props={demand} />}

              {/* STATUS */}
              {options === 'status' && <DemandStatus props={demand} />}

              {/* ANEXOS */}
              {options === 'files' && <DemandAnexos props={demand} />}
            </View>
          )}

          {/* COMPARTMENTS */}
          <BottomSheet
            snapPoints={['45%']}
            // ref={bottomSheetRefCompartment}
            index={-1}
            enablePanDownToClose={true}
          >
            <BottomSheetView className="flex-1 bg-zinc-50 gap-3 p-4">
              <View className="justify-center items-center">
                <HomeIcon size={120} color={colors.green[600]} />
              </View>
              <View className="border border-zinc-200 p-3 rounded-2xl">
                <View className="flex-row items-center gap-2">
                  <BugIcon size={16} color={colors.zinc[500]} />
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
                  <ListCheckIcon size={16} color={colors.zinc[500]} />
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
                  <PickaxeIcon size={16} color={colors.zinc[500]} />
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
                  <Text className="text-sm font-semibold text-zinc-500 ">
                    3
                  </Text>
                </View>
                <View className="justify-between items-center flex-row p-2">
                  <Text className="text-sm font-semibold text-zinc-500">
                    Catanas
                  </Text>
                  <Text className="text-sm font-semibold text-zinc-500 ">
                    4
                  </Text>
                </View>
                <View className="justify-between items-center flex-row p-2">
                  <Text className="text-sm font-semibold text-zinc-500">
                    Alicate
                  </Text>
                  <Text className="text-sm font-semibold text-zinc-500 ">
                    2
                  </Text>
                </View>
              </View>
            </BottomSheetView>
          </BottomSheet>

          {/* CARS */}
          <BottomSheet
            snapPoints={['45%']}
            // ref={bottomSheetRefCars}
            index={-1}
            enablePanDownToClose={true}
          >
            <BottomSheetView className="flex-1 bg-zinc-50 gap-3 p-4">
              <View className="justify-center items-center">
                <CarIcon size={120} color={colors.green[600]} />
              </View>
              <View className="border border-zinc-200 p-3 rounded-2xl">
                <View className="flex-row items-center gap-2">
                  <UserIcon size={16} color={colors.zinc[500]} />
                  <Text className="text-sm text-zinc-500">Motorista</Text>
                </View>
                <Text className="text-sm font-semibold text-green-600 ml-4">
                  John Doe
                </Text>
              </View>
              <View className="border border-zinc-200 p-3 rounded-2xl">
                <View className="flex-row items-center gap-2">
                  <CarFrontIcon size={16} color={colors.zinc[500]} />
                  <Text className="text-sm text-zinc-500">Marca</Text>
                </View>
                <Text className="text-sm font-semibold text-green-600 ml-4">
                  KIA
                </Text>
              </View>
              <View className="border border-zinc-200 p-3 rounded-2xl">
                <View className="flex-row items-center gap-2">
                  <CarIcon size={16} color={colors.zinc[500]} />
                  <Text className="text-sm text-zinc-500">Modelo</Text>
                </View>
                <Text className="text-sm font-semibold text-green-600 ml-4">
                  I20
                </Text>
              </View>
              <View className="border border-zinc-200 p-3 rounded-2xl">
                <View className="flex-row items-center gap-2">
                  <CarFrontIcon size={16} color={colors.zinc[500]} />
                  <Text className="text-sm text-zinc-500">Matricula</Text>
                </View>
                <Text className="text-sm font-semibold text-green-600 ml-4">
                  LD-54-63-AO
                </Text>
              </View>
            </BottomSheetView>
          </BottomSheet>

          {/* EDIT DEMAND */}
          {/* {options === 'status' && (
          <EditDemand handleOpenAddCars={handleOpenAddCars} />
        )} */}
          {/* CAR */}
          <BottomSheet
            snapPoints={['45%']}
            // ref={bottomSheetRefAddCar}
            index={-1}
            enablePanDownToClose={true}
          >
            <BottomSheetView className="flex-1 bg-zinc-50 gap-3 p-4">
              <View className="justify-center items-center">
                <CarIcon size={120} color={colors.green[600]} />
              </View>
              <View className="border border-zinc-200 p-3 rounded-2xl">
                <View className="flex-row items-center gap-2">
                  <UserIcon size={16} color={colors.zinc[500]} />
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
      <View
        className="p-4 flex-row gap-x-4 absolute bottom-0 bg-gray-100"
        style={{ paddingBottom: bottom }}
      >
        <TouchableOpacity className="h-[48px] flex-1 w-full bg-red-200 justify-center items-center rounded-lg">
          <Trash color={'red'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/edit-demand',
              params: {
                demandId: demand?.id,
              },
            })
          }
          className="h-[48px] flex-1 w-full bg-green-200 justify-center items-center rounded-lg"
        >
          <Edit2Icon color={'green'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
