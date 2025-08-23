import { TouchableOpacity, Text } from 'react-native'
import { cn } from '@/lib/utils'

type SelectOption = 'all' | 'schedule' | 'pendent' | 'processing' | 'done'

interface SelectButtonProps {
  label: string
  value: SelectOption
  selected: SelectOption
  onSelect: (value: SelectOption) => void
}

export function SelectButton({
  label,
  value,
  selected,
  onSelect,
}: SelectButtonProps) {
  const isActive = selected === value

  return (
    <TouchableOpacity
      onPress={() => onSelect(value)}
      className={cn(
        'rounded-2xl px-4 py-2 active:scale-95 transition-transform',
        isActive ? 'bg-green-600' : 'border border-zinc-400'
      )}
    >
      <Text
        className={cn('text-sm', isActive ? 'text-zinc-50' : 'text-zinc-500')}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
