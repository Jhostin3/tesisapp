import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AttendanceScreen from '../screens/guard/AttendanceScreen';
import HomeGuardScreen from '../screens/guard/HomeGuardScreen';
import ProfileGuardScreen from '../screens/guard/ProfileGuardScreen';
import RecentLogsScreen from '../screens/guard/RecentLogsScreen';
import StudentSearchScreen from '../screens/guard/StudentSearchScreen';
import { colors } from '../constants/colors';
import type { GuardProfile } from '../types/models';
import type { GuardTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<GuardTabParamList>();
const icons = { Inicio: 'home', Asistencia: 'checkmark-circle', Buscar: 'search', Historial: 'time', Perfil: 'person' } as const;

type Props = { guard: GuardProfile; onLogout: () => void };

export default function GuardNavigator({ guard, onLogout }: Props) {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      tabBarStyle: { borderTopColor: colors.border, height: 68, paddingTop: 8, paddingBottom: 8, backgroundColor: colors.white },
      tabBarIcon: ({ color, focused }) => (
        <View style={{ backgroundColor: focused ? colors.primaryLight : 'transparent', borderRadius: 8, padding: 5 }}>
          <Ionicons name={icons[route.name]} size={20} color={color} />
        </View>
      ),
    })}>
      <Tab.Screen name="Inicio" component={HomeGuardScreen} initialParams={{ guard }} />
      <Tab.Screen name="Asistencia" component={AttendanceScreen} />
      <Tab.Screen name="Buscar" component={StudentSearchScreen} />
      <Tab.Screen name="Historial" component={RecentLogsScreen} />
      <Tab.Screen name="Perfil">{() => <ProfileGuardScreen guard={guard} onLogout={onLogout} />}</Tab.Screen>
    </Tab.Navigator>
  );
}
