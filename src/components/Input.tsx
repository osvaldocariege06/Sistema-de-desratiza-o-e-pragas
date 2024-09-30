import type { ReactNode } from 'react'
import {
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'

import { cn } from '../lib/utils'
import { colors } from '@/styles/colors'
import { Eye, EyeOff } from 'lucide-react-native'

type Variants = 'primary' | 'secondary' | 'tertiary'

export type InputProps = {
  children: ReactNode
  variants?: Variants
}

interface FieldPasswordProps extends TextInputProps {
  // children: ReactNode
  variants?: Variants
  showPassword: boolean
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
  innerRef?: React.LegacyRef<TextInput>
}

interface FieldProps extends TextInputProps {
  innerRef?: React.LegacyRef<TextInput>
}

export type LabelProps = {
  title: string
}

function Input({ children }: InputProps) {
  return <View className="flex flex-col gap-4">{children}</View>
}

function Field({ innerRef, ...rest }: FieldProps) {
  return (
    <TextInput
      ref={innerRef}
      className="border-0 bg-zinc-100 h-14 rounded-md px-4 text-sm"
      placeholderTextColor={colors.zinc[400]}
      {...rest}
    />
  )
}

function FieldPassword({
  showPassword,
  setShowPassword,
  innerRef,
  ...rest
}: FieldPasswordProps) {
  return (
    <View className="bg-zinc-100 h-14 px-4 rounded-md flex flex-row justify-between items-center">
      <TextInput
        ref={innerRef}
        className="border-0 bg-zinc-100 h-full rounded-md text-sm"
        placeholderTextColor={colors.zinc[400]}
        secureTextEntry={showPassword}
        {...rest}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <Eye color={colors.zinc[800]} className="size-4" />
        ) : (
          <EyeOff color={colors.zinc[800]} className="size-4" />
        )}
      </TouchableOpacity>
    </View>
  )
}

function Label({ title }: LabelProps) {
  return <Text>{title}</Text>
}

Input.Label = Label
Input.Field = Field
Input.FieldPassword = FieldPassword

export { Input }
