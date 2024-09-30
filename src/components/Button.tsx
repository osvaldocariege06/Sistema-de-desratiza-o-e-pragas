import clsx from 'clsx'
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  type TextProps,
  type TouchableOpacityProps,
} from 'react-native'

type Variants = 'primary' | 'secondary'
type ButtonProps = TouchableOpacityProps & {
  variant?: Variants
  isLoading?: boolean
}

function Button({ variant, isLoading, children, ...rest }: ButtonProps) {
  return (
    <Pressable
      className={clsx(
        'h-11 rounded-lg flex-row justify-center items-center gap-4 active:scale-95 transition-transform disabled:bg-green-950',
        {
          'bg-green-600': variant === 'primary',
          'bg-zinc-800': variant === 'secondary',
        }
      )}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <ActivityIndicator className={'text-white'} /> : children}
    </Pressable>
  )
}

function Title({ children }: TextProps) {
  return <Text>{children}</Text>
}

Button.Title = Title

export { Button }
