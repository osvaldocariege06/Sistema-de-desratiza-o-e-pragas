import { colors } from '@/styles/colors'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react-native'
import type { Dispatch, SetStateAction } from 'react'
import { Pressable, Text } from 'react-native'

interface ButtonStatusProps {
  status: 'pendent' | 'running' | 'done'
  setStatus: Dispatch<SetStateAction<'pendent' | 'running' | 'done'>>
}

export function ButtonStatus({
  status = 'pendent',
  setStatus,
}: ButtonStatusProps) {
  function handleStatus() {
    if (status === 'pendent') {
      setStatus('running')
    } else if (status === 'running') {
      setStatus('done')
    } else if (status === 'done') {
      setStatus('pendent')
    }
  }

  return (
    <Pressable
      onPress={handleStatus}
      className={clsx(
        'flex-1 justify-between items-center flex-row h-14 px-4 rounded-2xl',
        {
          'bg-yellow-600': status === 'pendent',
          'bg-orange-600': status === 'running',
          'bg-green-600': status === 'done',
        }
      )}
    >
      <Text className="text-white">
        {(status === 'pendent' && 'Pendente') ||
          (status === 'running' && 'Em andamento') ||
          (status === 'done' && 'Concluídos')}
      </Text>
      <ChevronDown size={20} color={colors.zinc[50]} />
    </Pressable>
  )
}
