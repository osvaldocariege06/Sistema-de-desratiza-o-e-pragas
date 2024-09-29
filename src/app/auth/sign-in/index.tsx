import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { Input } from '@/components/Input'
import { Switch } from '@/components/Switch'
import { Link } from 'expo-router'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [saveDevice, setSaveDevice] = useState(false)

  return (
    <View className="p-4">
      <Text className="mt-20 text-xl font-semibold">Fazer Login</Text>

      <View className="flex flex-col gap-8 mt-10">
        <Input>
          <Input.Label title="E-mail" />
          <Input.Field
            keyboardType="email-address"
            placeholder="Digite seu e-mail"
          />
        </Input>
        <Input>
          <Input.Label title="Senha" />
          <Input.FieldPassword
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder="senha"
          />
        </Input>
      </View>
      <View className="flex flex-row mt-6 mb-10 justify-between items-center">
        <View className="flex-row items-center gap-2">
          <Switch
            saveDevice={saveDevice}
            onChange={() => setSaveDevice(!saveDevice)}
            value={saveDevice}
            className="h-5"
          />
          <Text className="text-xs">Lembrar este dispositivo</Text>
        </View>
        <Link href={'/'} className="text-xs text-green-600">
          Esqueceu sua senha?
        </Link>
      </View>

      <View className="bg-green-600 h-10 rounded-lg justify-center items-center active:scale-95 transition-transform">
        <TouchableOpacity>
          <Text className="text-white">Entrar</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-zinc-300 h-px my-6" />

      <View className="bg-zinc-800 h-10 rounded-lg flex-row gap-4 justify-center items-center active:scale-95 transition-transform">
        <Image
          source={require('@/assets/images/google.png')}
          className="w-5 h-5"
        />
        <TouchableOpacity className="flex-row">
          <Text className="text-white">Ou entre com Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
