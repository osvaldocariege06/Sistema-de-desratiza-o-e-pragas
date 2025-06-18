import { View, Text } from 'react-native'

interface DescriptionProps {
  description?: string
  observation?: string
}

export function Description({
  description = '',
  observation = '',
}: DescriptionProps) {
  return (
    <View className="gap-5 px-4 mb-4">
      <View className="gap-2">
        <Text className="text-zinc-500 text-sm">{description}</Text>
      </View>

      <View className="gap-2">
        <Text className="text-sm font-semibold text-zinc-500">Observações</Text>
        <View className="bg-white p-4 rounded-2xl justify-center items-center">
          {observation}
          {observation === '' && (
            <Text className="text-zinc-500 text-sm">Nenhuma observação</Text>
          )}
        </View>
      </View>
    </View>
  )
}
