import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, ScrollView, View, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { Link, router } from 'expo-router'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { signIn } from '@/lib/appwrite'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setSubmitting] = useState(false)

  const submit = async () => {
    const { email, password } = formData

    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields')
      return
    }

    setSubmitting(true)
    try {
      const result = await signIn(email, password)

      console.log(result)

      // set it to global store...

      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full min-h-[80vh] justify-center px-4 my-6">
            <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
            <Text className="text-2xl font-psemibold text-white mt-10">
              Sign in
            </Text>
            <FormField
              title="Email"
              value={formData.email}
              placeholder="Email"
              onChangeText={(value) => setFormData({ ...formData, email: value })}
              keyboardType="email-address"
              otherStyles="mt-7"
            />
            <FormField
              title="Password"
              value={formData.password}
              placeholder="Password"
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn
