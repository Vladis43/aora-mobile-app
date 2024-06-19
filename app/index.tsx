import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, View, Image, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { colors, images } from '@/constants'
import CustomButton from '@/components/CustomButton'

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full min-h-[85vh] items-center justify-center px-4">
          <Image source={images.logo} resizeMode="contain" className="w-[130px] h-[84px]"/>
          <Image source={images.cards} resizeMode="contain" className="max-w-[380px] w-full h-[300px] mt-6"/>
          <View className="relative mt-3">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with
              {' '}
              <Text className="text-secondary-200">
                Aora
              </Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              className="w-[130px] h-[15px] absolute -bottom-2 -right-8"
            />
          </View>
          <Text className="text-sm text-gray-100 font-pregular text-center mt-5">
            Where Creativity Meets Innovation: Embark on
            a Journey of Limitless Exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            onPress={() => router.push('/sign-in')}
            containerStyles="w-full mt-8"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={colors.primary} style="light"/>
    </SafeAreaView>
  )
}

export default App
