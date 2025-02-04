import { getIniciais } from '@/utils/get-Iniciais-name'
import {
  Avatar as AvatarContainer,
  AvatarFallback,
  AvatarImage,
} from './ui/Avatar'
import { Text } from 'react-native'

import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string
  fallback: string
  className?: string
  marginLeft?: number
}

export function Avatar({ src, fallback, marginLeft, className }: AvatarProps) {
  return (
    <AvatarContainer
      style={{ marginLeft: marginLeft }}
      className={cn('w-9 h-9 border border-green-800', className)}
    >
      <AvatarImage src={src} />
      <AvatarFallback>
        <Text className="text-xs text-white">{getIniciais(fallback)}</Text>
      </AvatarFallback>
    </AvatarContainer>
  )
}
