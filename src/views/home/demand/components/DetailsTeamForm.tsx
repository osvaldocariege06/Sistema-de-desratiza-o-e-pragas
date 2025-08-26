import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import type React from 'react'
import { useState } from 'react'

import { BottomModal } from '@/components/bottom-sheets/bottom-modal/BottomModal'
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { CircleIcon, CheckCircleIcon, UsersIcon } from 'lucide-react-native'
import { Button } from '@/components/Button'
import type { DemandProps } from '@/types/demands'
import { Avatar } from '@/components/Avatar'
import { colors } from '@/styles/colors'

interface Props {
  bottomSheetRef: React.RefObject<BottomSheetMethods>
  onClose: () => void
  demand?: DemandProps
}

export default function DetailsTeamForm({
  bottomSheetRef,
  demand,
  onClose,
}: Props) {
  // Estado para armazenar múltiplos selecionados
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])

  const toggleSelect = (id: number) => {
    setSelectedMembers(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <BottomModal ref={bottomSheetRef} snapPoints={['90%']} enablePanDownToClose>
      <View className="p-4 gap-y-6">
        <View className="flex-row items-center gap-2">
          <UsersIcon size={16} />
          <Text className="font-bold">Equipe presente</Text>
        </View>

        <View className="gap-y-4">
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={item => String(item)}
            ItemSeparatorComponent={() => <View className="h-4" />}
            renderItem={({ item }) => {
              const isSelected = selectedMembers.includes(item)
              return (
                <TouchableOpacity
                  onPress={() => toggleSelect(item)}
                  className={`border p-4 rounded-lg flex-row justify-between items-center ${
                    isSelected
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-300'
                  }`}
                >
                  <View className="flex-row gap-x-2 items-center">
                    <Avatar
                      src="/"
                      fallback="Bertha Guzman"
                      className="bg-violet-600"
                    />
                    <Text>Bertha Guzman</Text>
                  </View>
                  {isSelected ? (
                    <CheckCircleIcon color={colors.green[600]} />
                  ) : (
                    <CircleIcon color={colors.zinc[400]} />
                  )}
                </TouchableOpacity>
              )
            }}
          />
        </View>

        <Button
          variant="primary"
          onPress={() => {
            // exemplo: salvar os selecionados no formulário
            // setValue('selectedTeam', selectedMembers)
            // onSubmit()
          }}
          // isLoading={isUpdateWorkOrder}
        >
          <Button.Title className="text-white">Salvar</Button.Title>
        </Button>
      </View>
    </BottomModal>
  )
}
