import {
  View,
  Text,
  Image,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native'
import React, { type ReactNode, type RefObject, useRef, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { Input } from '@/components/Input'
import { Link } from 'expo-router'
import { Button } from '@/components/Button'
import type { TextInput } from 'react-native'
import { Platform } from 'react-native'

type FormData = {
  fullname: string
  email: string
  password: string
}

const schema = zod
  .object({
    fullname: zod
      .string()
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .max(32, 'Nome deve ter no máximo 32 caracteres'),
    email: zod.string().email('Insira um e-mail válido!'),
    password: zod.string().min(5, 'Senha deve ter no mínimo 6 caracteres'),
  })
  .required()

export default function SignUp() {
  const emailRef = useRef<TextInput | null>(null)
  const passwordRef = useRef<TextInput | null>(null)

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(data: FormData) {
    Keyboard.dismiss()
    console.log(data)
    setIsLoading(true)
  }

  const handleOnSubmitEditing = (ref: RefObject<TextInput>) => {
    if (ref?.current) {
      ref.current.focus() // Garante que `ref.current` não é null
    }
  }

  const scrollRef = useRef<KeyboardAwareScrollView>(null)

  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  const scrollToInput = (reactNode: Object) => {
    if (reactNode) {
      scrollRef.current?.scrollToFocusedInput(reactNode)
    }
  }

  return (
    <ScrollView className="p-4 flex-1">
      <View className="flex-col justify-between flex-1">
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          ref={scrollRef}
          style={{ flex: 1 }}
        >
          <Text className="mt-20 text-xl font-semibold">Criar conta</Text>

          <View className="flex flex-col gap-4 my-10">
            <Input>
              <Input.Label title="Nome completo" />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Field
                    keyboardType="default"
                    placeholder="Digite seu nome completo"
                    editable={!isLoading}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="next"
                    onSubmitEditing={() => handleOnSubmitEditing(emailRef)}
                    onFocus={event => {
                      scrollToInput(event.target)
                    }}
                  />
                )}
                name="fullname"
              />
              {errors.email && (
                <Text className="text-xs text-red-800">
                  {errors.fullname?.message}
                </Text>
              )}
            </Input>
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
                    onFocus={event => {
                      scrollToInput(event.target)
                    }}
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
            <Input>
              <Input.Label title="Senha" />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.FieldPassword
                    innerRef={passwordRef}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    placeholder="Digite sua senha"
                    editable={!isLoading}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    onFocus={event => {
                      scrollToInput(event.target)
                    }}
                  />
                )}
                name="password"
              />
              {errors.email && (
                <Text className="text-xs text-red-800">
                  {errors.password?.message}
                </Text>
              )}
            </Input>
          </View>

          <Button
            variant="primary"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white">Criar conta</Text>
          </Button>

          <View className="bg-zinc-300 h-px my-6" />
          <View className="flex-col items-center justify-center">
            <Text className="text-sm text-zinc-600 text-center mt-4">
              Já tem uma conta?
            </Text>
            <Link href={'/auth/sign-in'} className="text-green-600 font-medium">
              Entrar aqui.
            </Link>
          </View>
        </KeyboardAwareScrollView>

        <Text className="text-sm text-zinc-600 text-center mt-6">
          ©Copyright 2024
        </Text>
      </View>
    </ScrollView>
  )
}
