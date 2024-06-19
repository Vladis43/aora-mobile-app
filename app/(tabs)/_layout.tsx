import { Image, View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import { icons, colors } from '@/constants'

interface TabIconProps {
  icon: ImageData
  color: string
  name: string
  focused: boolean
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => (
  <View className="items-center justify-center gap-2">
    <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6"/>
    <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
      {name}
    </Text>
  </View>
)

const TabsLayout = () => (
  <Tabs
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.secondary['300'],
      tabBarInactiveTintColor: colors.gray['100'],
      tabBarStyle: {
        backgroundColor: colors.primary,
        borderTopWidth: 1,
        borderTopColor: colors.black['200'],
        height: 84,
      }
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: 'Home',
        tabBarIcon: ({ color, focused }) => (
          <TabIcon icon={icons.home} color={color} name="Home" focused={focused}/>
        )
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, focused }) => (
          <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused}/>
        )
      }}
    />
    <Tabs.Screen
      name="create"
      options={{
        title: 'Create',
        tabBarIcon: ({ color, focused }) => (
          <TabIcon icon={icons.plus} color={color} name="Create" focused={focused}/>
        )
      }}
    />
    <Tabs.Screen
      name="bookmark"
      options={{
        title: 'Saved',
        tabBarIcon: ({ color, focused }) => (
          <TabIcon icon={icons.bookmark} color={color} name="Saved" focused={focused}/>
        )
      }}
    />
  </Tabs>
)

export default TabsLayout
