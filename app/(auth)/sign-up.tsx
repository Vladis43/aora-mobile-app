import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, ScrollView, View, Text, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import { Link, router } from 'expo-router'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { createUser } from '@/lib/appwrite'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setSubmitting] = useState(false)

  const submit = async () => {
    const { email, password, username } = formData

    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill all the fields')
      return
    }

    setSubmitting(true)
    try {
      const result = await createUser(email, password, username)

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
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full min-h-[80vh] justify-center px-4 my-6">
            <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
            <Text className="text-2xl font-psemibold text-white mt-10">
              Sign up
            </Text>
            <FormField
              title="Username"
              placeholder="Username"
              value={formData.username}
              onChangeText={(value) => setFormData({ ...formData, username: value })}
              otherStyles="mt-7"
            />
            <FormField
              title="Email"
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => setFormData({ ...formData, email: value })}
              keyboardType="email-address"
              otherStyles="mt-7"
            />
            <FormField
              title="Password"
              placeholder="Password"
              value={formData.password}
              onChangeText={(value) => setFormData({ ...formData, password: value })}
              otherStyles="mt-7"
            />
            <CustomButton title="Sign Up" onPress={submit} containerStyles="mt-6" isLoading={isSubmitting}/>
            <View className="mt-5 justify-center items-center flex-row">
              <Text className="text-sm text-gray-100 font-pregular">
                Already have an account?
                {' '}
              </Text>
              <Link href="/sign-in" className="text-sm font-psemibold text-secondary-100">
                Login
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp
