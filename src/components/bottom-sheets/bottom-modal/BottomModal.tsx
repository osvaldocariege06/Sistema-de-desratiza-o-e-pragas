import type React from 'react'
import { forwardRef } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import type { ViewProps } from 'react-native'

type BottomModalProps = {
  snapPoints?: (string | number)[]
  children: React.ReactNode
  initialIndex?: number
  enablePanDownToClose?: boolean
} & ViewProps

export const BottomModal = forwardRef<BottomSheet, BottomModalProps>(
  (
    {
      snapPoints = ['45%'],
      children,
      initialIndex = -1,
      enablePanDownToClose = true,
      ...rest
    },
    ref
  ) => {
    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={initialIndex}
        enablePanDownToClose={enablePanDownToClose}
      >
        <BottomSheetView className="flex-1 bg-zinc-50 p-4" {...rest}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    )
  }
)

BottomModal.displayName = 'BottomModal'
