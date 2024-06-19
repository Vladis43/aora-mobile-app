import { Text, TouchableOpacity } from 'react-native'

interface Props {
  title: string
  onPress: () => void
  containerStyles?: string
  isLoading?: boolean
}

const CustomButton = ({ title, onPress, containerStyles, isLoading }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className={`bg-secondary rounded-xl min-h-[60px] items-center justify-center ${containerStyles} ${isLoading ? 'opacity-5' : ''}`}
    disabled={isLoading}
  >
    <Text className="text-primary font-psemibold text-lg">
      {title}
    </Text>
  </TouchableOpacity>
)

export default CustomButton
