import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { Demand } from '@/components/Demand'
import { useAuthStore } from '@/stores/authStore'
import { DemandsHeader } from '@/components/DemandsHeader'
import { DemandsSearchAndFilters } from '@/components/DemandsSearchAndFilters'
import { useDemands } from './hooks/useDemands'
import { useDemandsStore } from '@/stores/demandsStore'

export default function Demands() {
  const {
    filterHeight,
    filteredDemands,
    isKeyboardVisible,
    searchQuery,
    selectedFilter,
    setSearchQuery,
    setSelectedFilter,
  } = useDemands()
  const { user } = useAuthStore()

  const renderHeader = () => (
    <DemandsSearchAndFilters
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedFilter={selectedFilter}
      onFilterSelect={setSelectedFilter}
      isKeyboardVisible={isKeyboardVisible}
      filterHeight={filterHeight}
    />
  )

  return (
    <View style={styles.container}>
      <StatusBar
        showHideTransition={'fade'}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />

      {/* SafeAreaView com background que vai aparecer atrás do StatusBar */}
      <SafeAreaView style={styles.safeArea}>
        {/* Fixed Header */}
        <DemandsHeader username={'John Doe'} />

        {/* Scrollable Content */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.content}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <FlatList
            data={filteredDemands}
            keyExtractor={item => item.id}
            renderItem={({ item: demand }) => <Demand {...demand} />}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={() => (
              <Text className="text-center text-zinc-500">
                Nenhuma demanda encontrada
              </Text>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            bounces={false}
            overScrollMode="never"
            removeClippedSubviews={true}
            windowSize={5}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5E8D48', // Cor que aparecerá atrás do StatusBar
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Cor do fundo do app
  },
  content: {
    flex: 1,
  },
  listContent: {
    gap: 16,
    paddingHorizontal: 8,
    paddingBottom: Platform.OS === 'ios' ? 100 : 32,
  },
})
