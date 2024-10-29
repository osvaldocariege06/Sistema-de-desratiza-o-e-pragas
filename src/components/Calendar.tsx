// biome-ignore lint/style/useImportType: <explanation>
import React, { Dispatch, useRef, useCallback, RefObject } from 'react'
import {
  Calendar as RNCalendar,
  type CalendarProps,
  LocaleConfig,
} from 'react-native-calendars'
import { colors } from '@/styles/colors'

import { ptPT } from '@/utils/calendar-configs'
import { View } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import dayjs from 'dayjs'
LocaleConfig.locales['pt-pt'] = ptPT
LocaleConfig.defaultLocale = 'pt-pt'

interface CalendarsProps extends CalendarProps {
  selected: Date | string
  setSelected: Dispatch<React.SetStateAction<Date | string>>
  bottomSheetRefInitialCalendar: RefObject<BottomSheetMethods>
}

export function Calendar({
  selected,
  setSelected,
  bottomSheetRefInitialCalendar,
  ...rest
}: CalendarsProps) {
  const onDateSelect = (day: { dateString: string }) => {
    setSelected(day.dateString) // Armazena a data selecionada
  }

  return (
    <BottomSheet
      snapPoints={['65%']}
      ref={bottomSheetRefInitialCalendar}
      index={-1}
      enablePanDownToClose={true}
    >
      <BottomSheetView className="flex-1 bg-zinc-800">
        <View className="">
          <RNCalendar
            hideExtraDays
            minDate={dayjs().toDate().toISOString()}
            style={{
              overflow: 'hidden',
              backgroundColor: colors.zinc[800],
            }}
            onDayPress={onDateSelect}
            theme={{
              textMonthFontSize: 18,
              selectedDayBackgroundColor: colors.green[600],
              selectedDayTextColor: '#fff',
              selectedDotColor: colors.green[600],
              calendarBackground: 'transparent',
              monthTextColor: colors.zinc[200],
              agendaDayNumColor: colors.zinc[200],
              arrowColor: colors.green[600],
              textDayStyle: { color: colors.zinc[200] },
              textDisabledColor: colors.zinc[500],
              todayTextColor: colors.green[600],
            }}
            markedDates={{
              [selected.toString()]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: 'Blue',
              },
            }}
            {...rest}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
}
