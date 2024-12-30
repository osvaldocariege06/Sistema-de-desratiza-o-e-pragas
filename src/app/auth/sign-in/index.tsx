import {
  View,
  Text,
  ScrollView,
  type TextInput,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native'
import React, { type RefObject, useEffect, useRef, useState } from 'react'
import { Link, router } from 'expo-router'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { Input } from '@/components/Input'
import { Switch } from '@/components/Switch'
import { Button } from '@/components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { api } from '@/lib/axios'
import { useAuthStore } from '@/stores/authStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

type LoginRequest = {
  email: string
  password: string
}

const schema = zod
  .object({
    // email: zod.string().email('Insira um e-mail válido!'),
    email: zod.string(),
    password: zod.string().min(5, 'Senha deve ter no mínimo 6 caracteres'),
  })
  .required()

export default function SignIn() {
  const passwordRef = useRef<TextInput | null>(null)

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [saveDevice, setSaveDevice] = useState(false)

  const { login, isAuthenticated } = useAuthStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit({ email, password }: LoginRequest) {
    Keyboard.dismiss()
    setIsLoading(true)

    await login(email, password)
    router.push('/demands')
    setIsLoading(false)
  }

  const handleOnSubmitEditing = (ref: RefObject<TextInput>) => {
    if (ref?.current) {
      ref.current.focus() // Garante que `ref.current` não é null
    }
  }

  return (
    <ScrollView className="p-4 flex-1">
      <View className="flex-col justify-between ">
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}
        >
          <Text className="mt-20 text-xl font-semibold">Fazer Login</Text>

          <View className="flex flex-col gap-4 mt-10">
            <Input>
              <Input.Label title="E-mail" />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Field
                    keyboardType="email-address"
                    placeholder="Digite seu e-mail"
                    autoCapitalize="none"
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
                    editable={!isLoading}
                    placeholder="Digite sua senha"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(onSubmit)}
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
          <View className="flex flex-row mt-6 mb-10 justify-between gap-4 items-center">
            <View className="flex-row items-center gap-2">
              <Switch
                saveDevice={saveDevice}
                onChange={() => setSaveDevice(!saveDevice)}
                value={saveDevice}
                className="h-5"
              />
              <Text className="text-xs -mb-2">Lembrar me</Text>
            </View>
            <Link href={'/auth/sign-in/forgot-password'} asChild>
              <TouchableOpacity activeOpacity={0.6}>
                <Text className="text-xs text-green-600">
                  Esqueci a minha senha?
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Button
            variant="primary"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white">Entrar</Text>
          </Button>
        </KeyboardAwareScrollView>

        <Text className="text-sm text-zinc-600 text-center mt-6">
          ©Copyright 2024
        </Text>
      </View>
    </ScrollView>
  )
}
