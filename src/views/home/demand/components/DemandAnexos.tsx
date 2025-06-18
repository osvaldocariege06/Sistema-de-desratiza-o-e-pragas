import { View, Text, Pressable, FlatList, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import type { DemandProps } from '@/types/demands'
import { FileImageIcon } from 'lucide-react-native'
import { colors } from '@/styles/colors'

import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'

interface Props {
  props?: DemandProps
}

export default function DemandAnexos({ props }: Props) {
  const [imageDatas, setImageDatas] = useState('')
  const [images, setImages] = useState([''])

  async function handleSelectedImage() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== ImagePicker.PermissionStatus.GRANTED) {
        return Alert.alert(
          'Conceder Permissão',
          'É necessário conceder permissão para aceder ao seu album'
        )
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
          }
        )
        setImageDatas(imageManipuled.uri)
        setImages([...images, imageManipuled.uri])
      }
    } catch (error) { }
  }
  return (
    <View className="py-4 gap-y-5">
      <View className="rounded-2xl gap-y-3">
        <Text className="text-sm text-zinc-500">Imagens</Text>
        <Pressable
          onPress={handleSelectedImage}
          disabled={images.length > 5}
          className="h-12 mt-2 justify-center items-center rounded-md bg-green-600 disabled:opacity-50 disabled:cursor-not-alloweds"
        >
          <Text className="text-sm text-zinc-100">Adicionar imagens</Text>
        </Pressable>
        <View className="flex-row items-center gap-2 mt-4">
          {images.length > 0 ? (
            <FlatList
              data={images}
              horizontal
              renderItem={({ index, item }) => (
                <View>
                  {item && (
                    <Image
                      key={index}
                      source={{ uri: item }}
                      alt=""
                      className={`w-[350px] h-[223px] rounded-2xl m bg-green-200 justify-center items-center p-4 ${index !== 0 && 'ml-2'}`}
                    />
                  )}
                </View>
              )}
            />
          ) : (
            <Text className="text-center text-zinc-800 mt-4">
              Nenhuma imagem adicionada
            </Text>
          )}
        </View>
      </View>

      <View className="rounded-2xl gap-y-3">
        <Text className="text-sm text-zinc-500">Documentos</Text>
        <View className="flex-row items-center gap-2">
          <FlatList
            data={[1, 2, 3, 4]}
            horizontal={true}
            renderItem={({ index }) => (
              <View
                className={`w-[280px] h-[223px] rounded-2xl m bg-zinc-200 justify-center items-center p-4 ${index !== 0 && 'ml-2'}`}
              >
                <FileImageIcon size={62} color={colors.green[600]} />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  )
}
