import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ColorValue } from 'react-native';

type IkonProps = { color: ColorValue; size: number; focused: boolean };

const ikon =
  (
    aktif: keyof typeof Ionicons.glyphMap,
    nonaktif: keyof typeof Ionicons.glyphMap,
  ) =>
  ({ color, size, focused }: IkonProps) => (
    <Ionicons name={focused ? aktif : nonaktif} size={size} color={color} />
  );

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
        options={{ title: 'Beranda', tabBarIcon: ikon('home', 'home-outline') }}
      />
      <Tabs.Screen
        name="bahan"
        options={{
          title: 'Bahan',
          tabBarIcon: ikon('basket', 'basket-outline'),
        }}
      />
      <Tabs.Screen
        name="tersimpan"
        options={{
          title: 'Tersimpan',
          tabBarIcon: ikon('bookmark', 'bookmark-outline'),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ikon('person', 'person-outline'),
        }}
      />
    </Tabs>
  );
}
