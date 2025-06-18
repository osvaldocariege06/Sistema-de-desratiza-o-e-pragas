import {
  View,
  Text,
  ScrollView,
  type TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native'
import React, { type RefObject, useRef, useState } from 'react'
import { Link, router } from 'expo-router'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { Input } from '@/components/Input'
import { Switch } from '@/components/Switch'
import { Button } from '@/components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAuthStore } from '@/stores/authStore'
import { signInSchema } from './utils/signInSchema'
import { useSignInForm } from './utils/useSignInForm'




export default function SignInView() {
  const passwordRef = useRef<TextInput | null>(null)
  const emailRef = useRef<TextInput | null>(null)

  const { watch, setValue, errors, isSignIn, onSubmit } = useSignInForm();


  const [showPassword, setShowPassword] = useState(false)
  const [saveDevice, setSaveDevice] = useState(false)


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
              <Input.Label title="Nome de usuário" />
              <Input.Field
                keyboardType="default"
                placeholder="Digite seu nome de usuário"
                autoCapitalize="words"
                editable={!isSignIn}
                onChangeText={(value) => setValue("username", value)}
                value={watch("username")}
                returnKeyType="next"
                onSubmitEditing={() => handleOnSubmitEditing(emailRef)}
              />

              {errors.username && (
                <Text className="text-xs text-red-800">
                  {errors.username.message}
                </Text>
              )}
            </Input>
            <Input>
              <Input.Label title="E-mail" />
              <Input.Field
                innerRef={emailRef}
                keyboardType="email-address"
                placeholder="Digite seu nome de usuário"
                autoCapitalize="none"
                editable={!isSignIn}
                onChangeText={(value) => setValue("email", value)}
                value={watch("email")}
                returnKeyType="next"
                onSubmitEditing={() => handleOnSubmitEditing(passwordRef)}
              />

              {errors.email && (
                <Text className="text-xs text-red-800">
                  {errors.email.message}
                </Text>
              )}
            </Input>
            <Input>
              <Input.Label title="Senha" />
              <Input.FieldPassword
                innerRef={passwordRef}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                editable={!isSignIn}
                placeholder="Digite sua senha"
                onChangeText={(value) => setValue("password", value)}
                value={watch("password")}
                returnKeyType="send"
                onSubmitEditing={onSubmit}
              />
              {errors.username && (
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
            isLoading={isSignIn}
            onPress={onSubmit}
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
