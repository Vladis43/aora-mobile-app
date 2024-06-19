import { Text, View } from 'react-native'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <Link href="/home">Home</Link>
    </View>
  )
}

export default App
