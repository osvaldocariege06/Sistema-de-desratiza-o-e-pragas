import { View, Text, ScrollView, Pressable, FlatList, Alert, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'

import { useRouter, useLocalSearchParams } from 'expo-router'
import {
  Bug,
  CalendarIcon,
  Car,
  CarFront,
  FileImage,
  Home,
  ImageIcon,
  ListCheck,
  MapPin,
  PencilLine,
  Pickaxe,
  User,
  Users,
} from 'lucide-react-native'
import { colors } from '@/styles/colors'
import { Avatar } from '@/components/Avatar'
import dayjs from 'dayjs'
import { formateDate } from '@/utils/format-date'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { EditDemand } from '@/components/demands/EditDemand'

export default function Info() {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  const [options, setOptions] = useState<
    'details' | 'status' | 'files' | 'edit'
  >('details')

  const [moreOptions, setMoreOptions] = useState<'compartments' | 'cars'>(
    'compartments'
  )
  const [imageDatas, setImageDatas] = useState('')
  const [images, setImages] = useState([''])

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


  const handleOpenAddCompartment = () => bottomSheetRefAddCompartment.current?.expand()
  const handleOpenAddCars = () => bottomSheetRefAddCar.current?.expand()

  async function handleSelectedImage() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== ImagePicker.PermissionStatus.GRANTED) {
        return Alert.alert('Conceder Permissão', 'É necessário conceder permissão para aceder ao seu album')
      }

      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        allowsMultipleSelection: false,
        selectionLimit: 5,
        aspect: [4, 4],
        quality: 1,
      })

      if (!response.canceled) {
        const imageManipuled = await ImageManipulator.manipulateAsync(
          response.assets[0].uri,
          [{ resize: { width: 900 } }],
          {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
          },
        )
        setImageDatas(imageManipuled.uri)
        setImages([...images, imageManipuled.uri])
      }
    } catch (error) { }
  }

  useEffect(() => {
    bottomSheetRefAddCompartment.current?.close()
    bottomSheetRefAddCar.current?.close()
  }, [])

  return (
    <ScrollView className="flex-1">

      <View className="flex-col gap-7">
        <View className="mt-8 p-4">
          <Text className="text-xl font-semibold">Desratização em galpão</Text>
          <View className="mt-4 justify-between items-center flex-row">
            <Pressable
              onPress={() => setOptions('details')}
              className={`flex-1  py-1 text-center justify-center items-center ${options === 'details' && 'border-b border-green-600'}`}
            >
              <Text
                className={`text-sm ${options === 'details' ? 'text-green-600' : 'text-zinc-400'}`}
              >
                Detalhes
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setOptions('status')}
              className={`flex-1  py-1 text-center justify-center items-center ${options === 'status' && 'border-b border-green-600'}`}
            >
              <Text
                className={`text-sm ${options === 'status' ? 'text-green-600' : 'text-zinc-400'}`}
              >
                Intervenção
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setOptions('files')}
              className={`flex-1  py-1 text-center justify-center items-center ${options === 'files' && 'border-b border-green-600'}`}
            >
              <Text
                className={`text-sm ${options === 'files' ? 'text-green-600' : 'text-zinc-400'}`}
              >
                Anexos
              </Text>
            </Pressable>
          </View>
        </View>
        {/* DETAILS */}
        {options === 'details' && (
          <View className="gap-3 p-4">
            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <User size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">Cliente</Text>
              </View>
              <Text className="text-sm font-semibold text-green-600 ml-4">
                Empresa XYZ
              </Text>
            </View>

            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <MapPin size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">Localização</Text>
              </View>
              <Text className="text-sm font-semibold text-green-600 ml-4">
                Luanda, KM 30, rua G
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
                  {formateDate(dayjs().toDate())}
                </Text>
              </View>
              <View className="flex-row gap-1 items-center mt-2">
                <Text className="text-sm text-zinc-500 ml-4">
                  Hora de Saída da base:
                </Text>
                <Text className="text-sm font-semibold text-green-600">
                  {formateDate(dayjs().add(10, 'days').toDate())}
                </Text>
              </View>
              <View className="flex-row gap-1 items-center mt-2">
                <Text className="text-sm text-zinc-500 ml-4">
                  Hora de chegada ao cliente:
                </Text>
                <Text className="text-sm font-semibold text-green-600">
                  {formateDate(dayjs().add(10, 'days').toDate())}
                </Text>
              </View>
              <View className="flex-row gap-1 items-center mt-2">
                <Text className="text-sm text-zinc-500 ml-4">
                  Início de execução:
                </Text>
                <Text className="text-sm font-semibold text-green-600">
                  {formateDate(dayjs().add(10, 'days').toDate())}
                </Text>
              </View>


              <View className="flex-row gap-1 items-center mt-2">
                <Text className="text-sm text-zinc-500 ml-4">Término:</Text>
                <Text className="text-sm font-semibold text-green-600">
                  {formateDate(dayjs().add(1, 'M').toDate())}
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
                Jordan Harper
              </Text>
            </View>

            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <Users size={16} color={colors.zinc[500]} />
                <Text className="text-sm text-zinc-500">Equipa Tecnica</Text>
              </View>
              <View className="flex-row mt-3">
                <Avatar
                  src="/"
                  fallback="Bertha Guzman"
                  className="bg-violet-600 "
                />
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
                    <Home size={60} color={colors.green[600]} />
                    <Text className="text-green-600">Quarto</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleOpenCompartment}
                    className="w-[150px] h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
                  >
                    <Home size={60} color={colors.green[600]} />
                    <Text className="text-green-600">Dispensa</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleOpenCompartment}
                    className="w-[150px]  h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
                  >
                    <Home size={60} color={colors.green[600]} />
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
                    <CarFront size={60} color={colors.green[600]} />
                    <Text className="text-green-600">BMW</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleOpenCars}
                    className="w-[150px] h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
                  >
                    <CarFront size={60} color={colors.green[600]} />
                    <Text className="text-green-600">KIA i20</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleOpenCars}
                    className="w-[150px]  h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
                  >
                    <CarFront size={60} color={colors.green[600]} />
                    <Text className="text-green-600">Autocarro</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleOpenCars}
                    className="w-[150px]  h-[160px] rounded-2xl gap-1 border border-green-600 justify-center items-center flex-col"
                  >
                    <CarFront size={60} color={colors.green[600]} />
                    <Text className="text-green-600">Ranger Over</Text>
                  </Pressable>
                </View>
              )}
            </View>

            <View className="border border-zinc-200 p-3 rounded-2xl">
              <View className="flex-row items-center gap-2">
                <PencilLine size={16} color={colors.zinc[500]} />
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
        )}
        {/* STATUS */}
        {options === 'status' && (
          <View className="px-4">
            <View className="border border-zinc-200 p-3 rounded-2xl">
              <Text className="text-sm text-zinc-500">
                Status da demanda
              </Text>
              <View className="flex-row items-center gap-2 mt-4 flex-wrap">
                <Pressable className="py-2 px-4 rounded-2xl bg-yellow-600 justify-center items-center">
                  <Text className="text-sm font-semibold text-white">
                    Pendente
                  </Text>
                </Pressable>
                {/* <Pressable className="py-2 px-4 rounded-2xl border border-orange-600 justify-center items-center">
                  <Text className="text-sm font-semibold text-orange-600">
                    Em andamento
                  </Text>
                </Pressable>
                <Pressable className="py-2 px-4 rounded-2xl border border-green-600 justify-center items-center">
                  <Text className="text-sm font-semibold text-green-600">
                    Concluído
                  </Text>
                </Pressable> */}
              </View>
            </View>
          </View>
        )}
        {/* ANEXOS */}
        {options === 'files' && (
          <View className="pl-4 mb-8">
            <View className="p-3 rounded-2xl">
              <Text className="text-sm text-zinc-500">Imagens</Text>
              <Pressable onPress={handleSelectedImage} disabled={images.length > 5} className='h-12 mt-2 justify-center items-center rounded-md bg-green-600 disabled:opacity-50 disabled:cursor-not-alloweds'>
                <Text className="text-sm text-zinc-100">Adicionar imagens</Text>
              </Pressable>
              <View className="flex-row items-center gap-2 mt-4">

                {images.length > 0 ? <FlatList
                  data={images}
                  horizontal
                  renderItem={({ index, item }) => (
                    <View >
                      {item && <Image key={index} source={{ uri: item }} alt='' className={`w-[350px] h-[223px] rounded-2xl m bg-green-200 justify-center items-center p-4 ${index !== 0 && 'ml-2'}`} />}
                    </View>


                  )}
                /> :
                  <Text className='text-center text-zinc-800 mt-4'>Nenhuma imagem adicionada</Text>
                }

              </View>
            </View>

            <View className="p-3 rounded-2xl">
              <Text className="text-sm text-zinc-500">Documentos</Text>
              <View className="flex-row items-center gap-2 mt-4">
                <FlatList
                  data={[1, 2, 3, 4]}
                  horizontal={true}
                  renderItem={({ index }) => (
                    <View
                      className={`w-[280px] h-[223px] rounded-2xl m bg-zinc-200 justify-center items-center p-4 ${index !== 0 && 'ml-2'}`}
                    >
                      <FileImage size={62} color={colors.green[600]} />
                    </View>
                  )}
                />
              </View>
            </View>
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
