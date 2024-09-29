import { Switch as NativeSwitch } from 'react-native'
import { colors } from '@/styles/colors'

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof NativeSwitch> {
  saveDevice: boolean
}

function Switch({ saveDevice, ...props }: SwitchProps) {
  return (
    <NativeSwitch
      style={{
        transform: [{ scaleX: 1 }, { scaleY: 0.8 }],
      }}
      trackColor={{
        true: colors.green[600],
        false: colors.zinc[400],
      }}
      thumbColor={saveDevice ? colors.lime[300] : colors.zinc[200]}
      {...props}
    />
  )
}

export { Switch }
