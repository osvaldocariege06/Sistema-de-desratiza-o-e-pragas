import { View, Text, Image, ScrollView, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { OtpInput } from 'react-native-otp-entry'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { Button } from '@/components/Button'
import type { TextInput } from 'react-native'
import { Input } from '@/components/Input'
import { router } from 'expo-router'
import { Pressable } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'

type FormData = {
  code: string
}

const schema = zod
  .object({
    code: zod
      .string()
      .min(6, 'Insira o código enviado!')
      .max(6, 'Insira o código enviado!'),
  })
  .required()

export default function SignUp() {
  const [codeIsFully, setCodeFully] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
    },
  })

  function onSubmit(data: FormData) {
    Keyboard.dismiss()
    setIsLoading(true)
    router.replace('/(tabs)/demands')
  }

  return (
    <ScrollView className="p-4 flex-1">
      <Pressable
        onPress={() => router.back()}
        className="flex-row mt-10 items-center gap-2"
      >
        <View className="w-8 h-8 flex-row justify-center items-center bg-green-600 rounded-full">
          <ChevronLeft color={'#fff'} />
        </View>
        <Text>Voltar</Text>
      </Pressable>
      <View className="flex-col justify-between flex-1">
        <Text className="mt-20 text-xl font-semibold">Confirmar código</Text>
        <Text className="mt-2 text-xs text-zinc-400">
          Insira o código de recuperação enviado ao seu e-mail
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
                <OtpInput
                  numberOfDigits={6}
                  onFilled={() => setCodeFully(true)}
                  onBlur={onBlur}
                  onTextChange={onChange}
                />
              )}
              name="code"
            />
            {errors.code && (
              <Text className="text-xs text-red-800">
                {errors.code.message}
              </Text>
            )}
          </Input>
        </View>

        {codeIsFully && (
          <Button
            variant="primary"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white">Continuar</Text>
          </Button>
        )}
      </View>
    </ScrollView>
  )
}
