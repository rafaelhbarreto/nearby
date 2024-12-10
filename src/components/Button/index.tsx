import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  Text, 
  TextProps,
  ActivityIndicator
} from 'react-native'

import { IconProps as TablerIconProps } from "@tabler/icons-react-native"
import { colors } from '@/styles/theme'
import { s } from './styles'

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
}

type IconProps = {
  icon: React.ComponentType<TablerIconProps>
}

function Button({ children, style, isLoading = false, ...rest}: ButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      style={[s.container, style]}
      disabled={isLoading}
      {...rest}
    > 
      { 
        isLoading ? 
          <ActivityIndicator 
            color={colors.gray[100]}   
            size="small"
          /> : 
          children
      }
    </TouchableOpacity>
  )
}

function Title ({ children }: TextProps) {
  return (
    <Text style={s.title}>
      { children }
    </Text>
  )
}


function Icon({ icon: Icon}: IconProps) {
  return (
    <Icon  size={24} color={colors.gray[100]}/>
  )
}

Button.title = Title
Button.icon = Icon

export { Button }