import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { type Dispatch, type RefObject, useState } from 'react'
import { View, Text, Pressable, Alert } from 'react-native'

interface BottomSheetOurTeamProps {
  bottomSheetRef: RefObject<BottomSheetMethods>
  setFilterTeam: Dispatch<React.SetStateAction<string[]>>
  setTeams: Dispatch<React.SetStateAction<string[]>>
  teams: string[]
}

export function BottomSheetOurTeam({
  setFilterTeam,
  setTeams,
  teams = [],
  bottomSheetRef,
}: BottomSheetOurTeamProps) {
  function handleAddUser(username: string) {
    setFilterTeam(prevState => [...prevState, username])
    setTeams(prevState => prevState.filter(name => name !== username))
  }

  return (
    <BottomSheet
      snapPoints={['50%']}
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose={true}
    >
      <BottomSheetView className="flex-1 bg-zinc-50 p-4">
        <Text className="text-zinc-800 font-medium">Equipe técnica</Text>
        <View className="py-4 flex-row gap-4 flex-wrap">
          {teams.length > 0 ? (
            teams.map(item => (
              <Pressable
                key={item}
                onPress={() => handleAddUser(item)}
                className="p-1 border border-zinc-400 rounded-2xl"
              >
                <Text className="text-sm text-zinc-400">{item}</Text>
              </Pressable>
            ))
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-sm text-zinc-500">Nenhum membro!</Text>
            </View>
          )}
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
}
