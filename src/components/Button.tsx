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
type TitleProps = TextProps & {
  className?: string
}

function Button({ variant, isLoading, children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className={clsx(
        'h-14 rounded-lg flex-row justify-center items-center gap-4 disabled:bg-green-950',
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
    </TouchableOpacity>
  )
}

function Title({ children, ...rest }: TitleProps) {
  return (
    <Text className="tex-sm" {...rest}>
      {children}
    </Text>
  )
}

Button.Title = Title

export { Button }
