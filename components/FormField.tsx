import { useState } from 'react'
import { Image, KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { icons } from '@/constants'

interface Props {
  title: string
  value: string
  onChangeText: (value: string) => void
  placeholder?: string
  otherStyles?: string
  keyboardType?: KeyboardTypeOptions
}

const FormField = ({ title, value, onChangeText, placeholder, keyboardType, otherStyles }: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-pmedium text-gray-100">{title}</Text>
      <View
        className="w-full h-16 p-4 bg-black-100 border-2 border-black-200 rounded-xl focus:border-secondary-200 items-center flex-row"
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === 'Password' && !showPassword}
          autoCapitalize="none"
          textContentType="none"
          autoComplete="off"
          className="text-base text-white font-psemibold flex-1"
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(state => !state)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} resizeMode="contain" className="w-6 h-6"/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
