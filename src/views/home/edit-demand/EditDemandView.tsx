import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useApiGetDemandById } from '../api/use-api-get-demands-id/useApiGetDemandById';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLastIcon, ChevronLeftCircle, ChevronLeftIcon, UsersIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input } from '@/components/Input';
import { colors } from '@/styles/colors';
import { Avatar } from '@/components/Avatar';

export default function EditDemandView() {
  const { top, bottom } = useSafeAreaInsets()
  const { demandId } = useLocalSearchParams<{ demandId: string }>()
  const { demand, isLoadingDemand, errorDemand } = useApiGetDemandById(demandId);


  return (
    <View>
      <View className='flex-row justify-between items-center bg-white p-4'>
        <TouchableOpacity onPress={() => router.back()} className='p-1 bg-green-400 rounded-full'>
          <ChevronLeftIcon />
        </TouchableOpacity>
        <Text className='text-lg font-bold'>Editar demanda</Text>
      </View>

      <View className='gap-y-4 mt-2'>
        <Input>
          <Input.Field placeholder='Name' />
        </Input>
        <View className="border border-zinc-200 p-3 rounded-2xl">
          <View className="flex-row items-center gap-2">
            <UsersIcon size={16} color={colors.zinc[500]} />
            <Text className="text-sm text-zinc-500">Equipa Tecnica</Text>
          </View>
          <TouchableOpacity className=''>
            <Text>Adicionar equipe técnica</Text>
          </TouchableOpacity>
          <View className="flex-row mt-3">
            <Avatar src="/" fallback="Bertha Guzman" className="bg-violet-600 " />
          </View>
        </View>
      </View>
    </View>
  )
}