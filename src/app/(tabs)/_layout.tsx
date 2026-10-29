import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ColorValue } from 'react-native';

type IconProps = { color: ColorValue; size: number; focused: boolean };

const tabIcon = (
  aktif: keyof typeof Ionicons.glyphMap,
  nonaktif: keyof typeof Ionicons.glyphMap,
) => {
  function IconTab({ color, size, focused }: IconProps) {
    return (
      <Ionicons name={focused ? aktif : nonaktif} size={size} color={color} />
    );
  }

  return IconTab;
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#34483A',
        tabBarInactiveTintColor: '#77766D',
        tabBarStyle: {
          backgroundColor: '#FAF8F3',
          borderTopColor: '#E7DED0',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans_600SemiBold',
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: tabIcon('home', 'home-outline'),
        }}
      />
      <Tabs.Screen
        name="pantry"
        options={{
          title: 'Bahan',
          tabBarIcon: tabIcon('basket', 'basket-outline'),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Tersimpan',
          tabBarIcon: tabIcon('bookmark', 'bookmark-outline'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: tabIcon('person', 'person-outline'),
        }}
      />
    </Tabs>
  );
}
