import { ActivityIndicator } from 'react-native'

export function Loading() {
  return (
    <ActivityIndicator className="flex-1 bg-green-600 justify-center items-center text-zinc-100" />
  )
}
