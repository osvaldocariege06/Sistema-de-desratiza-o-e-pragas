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
        transform: [{ scaleX: 1 }, { scaleY: 0.9 }],
      }}
      trackColor={{
        true: colors.zinc[200],
        false: colors.zinc[400],
      }}
      thumbColor={saveDevice ? colors.green[600] : colors.zinc[200]}
      {...props}
    />
  )
}

export { Switch }
