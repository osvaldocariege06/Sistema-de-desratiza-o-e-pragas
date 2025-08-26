import { Text, View } from 'react-native'
import type React from 'react'

import { BottomModal } from '@/components/bottom-sheets/bottom-modal/BottomModal'
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { CalendarIcon } from 'lucide-react-native'
import { Input } from '@/components/Input'
import { usePestWorkOrderForm } from '../../utils/update-demand/usePestWorkOrderForm'
import { Button } from '@/components/Button'
import type { DemandProps } from '@/types/demands'

interface Props {
  bottomSheetRef: React.RefObject<BottomSheetMethods>
  onClose: () => void
  demand?: DemandProps
}

export default function DetailsDatesForm({
  bottomSheetRef,
  demand,
  onClose,
}: Props) {
  const { isUpdateWorkOrder, onSubmit, setValue, watch } = usePestWorkOrderForm(
    {
      id: String(demand?.id) ?? '',
      callback: onClose,
    }
  )

  console.log(demand)

  const dataMarcacao = watch('dataMarcacao')
  const duracaoPrevista = watch('duracaoPrevista')
  const horaDeslocacao = watch('horaDeslocacao')
  const horaChegada = watch('horaChegada')
  const inicioServico = watch('inicioServico')

  return (
    <BottomModal ref={bottomSheetRef} snapPoints={['90%']} enablePanDownToClose>
      <View className="p-4 gap-y-6">
        <View className="flex-row items-center gap-2">
          <CalendarIcon size={16} />
          <Text className="font-bold">Data e Hora</Text>
        </View>

        <View className="gap-y-4">
          {/* Data de marcação */}
          <View className="gap-y-2">
            <Input.Label title="Data de marcação" />
            <Input.Field
              value={dataMarcacao?.toISOString()?.split('T')[0]}
              onChangeText={text => setValue('dataMarcacao', new Date(text))}
              placeholder="Data de marcação"
              editable={!isUpdateWorkOrder}
              classNameFiel="bg-gray-200 h-[48px]"
            />
          </View>

          {/* Duração prevista */}
          <View className="gap-y-2">
            <Input.Label title="Duração prevista" />
            <Input.Field
              value={duracaoPrevista?.toISOString()?.split('T')[0]}
              onChangeText={text => setValue('duracaoPrevista', new Date(text))}
              placeholder="Duração prevista"
              editable={!isUpdateWorkOrder}
              classNameFiel="bg-gray-200 h-[48px]"
            />
          </View>

          {/* Hora de deslocação */}
          <View className="gap-y-2">
            <Input.Label title="Hora de deslocação" />
            <Input.Field
              value={horaDeslocacao?.toISOString()}
              onChangeText={text => setValue('horaDeslocacao', new Date(text))}
              placeholder="Hora de deslocação"
              editable={!isUpdateWorkOrder}
              classNameFiel="bg-gray-200 h-[48px]"
            />
          </View>

          {/* Hora de chegada */}
          <View className="gap-y-2">
            <Input.Label title="Hora de chegada" />
            <Input.Field
              value={horaChegada?.toISOString()}
              onChangeText={text => setValue('horaChegada', new Date(text))}
              placeholder="Hora de chegada"
              editable={!isUpdateWorkOrder}
              classNameFiel="bg-gray-200 h-[48px]"
            />
          </View>

          {/* Início do serviço */}
          <View className="gap-y-2">
            <Input.Label title="Início do serviço" />
            <Input.Field
              value={inicioServico?.toISOString()}
              onChangeText={text => setValue('inicioServico', new Date(text))}
              placeholder="Início do serviço"
              editable={!isUpdateWorkOrder}
              classNameFiel="bg-gray-200 h-[48px]"
            />
          </View>
        </View>

        <Button
          variant="primary"
          onPress={onSubmit}
          isLoading={isUpdateWorkOrder}
        >
          <Button.Title className="text-white">Salvar</Button.Title>
        </Button>
      </View>
    </BottomModal>
  )
}
