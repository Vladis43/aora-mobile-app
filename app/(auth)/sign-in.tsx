import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, ScrollView, View, Text } from 'react-native'
import { Link } from 'expo-router'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setSubmitting] = useState(false)

  const submit = () => {
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full min-h-[80vh] justify-center px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
          <Text className="text-2xl font-psemibold text-white mt-10">
            Sign in
          </Text>
          <FormField
            title="Email"
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
            keyboardType="email-address"
            otherStyles="mt-7"
          />
          <FormField
            title="Password"
            value={formData.password}
            onChangeText={(value) => setFormData({ ...formData, password: value })}
            otherStyles="mt-7"
          />
          <Text className="mt-5 self-end font-pregular text-sm text-gray-100">
            Forgot password
          </Text>
          <CustomButton title="Log In" onPress={submit} containerStyles="mt-5" isLoading={isSubmitting}/>
          <View className="mt-5 justify-center items-center flex-row">
            <Text className="text-sm text-gray-100 font-pregular">
              Don't have an account?
              {' '}
            </Text>
            <Link href="/sign-up" className="text-sm font-psemibold text-secondary-100">
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
