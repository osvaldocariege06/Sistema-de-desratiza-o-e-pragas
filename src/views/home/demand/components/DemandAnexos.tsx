import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import type { DemandProps } from '@/types/demands'
import { FileImageIcon, X } from 'lucide-react-native'
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
    } catch (error) {}
  }

  function handleRemove(image?: string) {
    if (!image) return

    Alert.alert(
      'Remover imagem',
      'Tens certeza que queres remover esta imagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setImages(prev => prev.filter(img => img !== image))
          },
        },
      ]
    )
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
              ItemSeparatorComponent={() => <View className="w-4" />}
              renderItem={({ index, item }) => (
                <View className="gap-x-4">
                  {item && (
                    <>
                      <TouchableOpacity
                        onPress={() => handleRemove(item)}
                        className="bg-white/80 rounded-full absolute z-30 right-4 top-4 w-5 h-5 justify-center items-center"
                      >
                        <X size={14} color={'black'} />
                      </TouchableOpacity>
                      <Image
                        key={index}
                        source={{ uri: item }}
                        alt={item ?? 'Imagem'}
                        className={
                          'h-[223px] w-[350px] flex-1 rounded-2xl bg-green-200 justify-center items-center'
                        }
                      />
                    </>
                  )}
                </View>
              )}
            />
          ) : (
            <View
              className={
                'w-full h-[223px] rounded-2xl m bg-zinc-200 justify-center items-center p-4'
              }
            >
              <FileImageIcon size={62} color={colors.green[600]} />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
