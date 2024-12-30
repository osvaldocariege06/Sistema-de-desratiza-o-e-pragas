import { View, Text, ScrollView, Keyboard } from 'react-native'
import React, { type RefObject, useRef, useState } from 'react'

import { router } from 'expo-router'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import type { TextInput } from 'react-native'

type FormData = {
  email: string
}

const schema = zod
  .object({
    email: zod.string().email('Insira um e-mail válido!'),
  })
  .required()

export default function SignUp() {
  const emailRef = useRef<TextInput | null>(null)
  const passwordRef = useRef<TextInput | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(data: FormData) {
    Keyboard.dismiss()
    setIsLoading(true)
    router.push('/auth/sign-in/forgot-password/confirm-code')
  }

  const handleOnSubmitEditing = (ref: RefObject<TextInput>) => {
    if (ref?.current) {
      ref.current.focus() // Garante que `ref.current` não é null
    }
  }

  return (
    <ScrollView className="relative p-4 flex-1">
      <View className="flex-col justify-between flex-1">
        <Text className="mt-16 text-xl font-semibold">Recuperar Senha</Text>
        <Text className="mt-2 text-xs text-zinc-400">
          Insira seu e-mail para receber o código de recuperação
        </Text>

        <View className="flex flex-col gap-4 my-10">
          <Input>
            <Input.Label title="E-mail" />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input.Field
                  innerRef={emailRef}
                  keyboardType="email-address"
                  placeholder="Digite seu e-mail"
                  editable={!isLoading}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => handleOnSubmitEditing(passwordRef)}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-xs text-red-800">
                {errors.email.message}
              </Text>
            )}
          </Input>
        </View>

        <Button
          variant="primary"
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white">Enviar</Text>
        </Button>
      </View>
    </ScrollView>
  )
}
