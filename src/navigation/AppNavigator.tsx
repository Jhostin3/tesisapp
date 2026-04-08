import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import StudentSearchScreen from '../screens/StudentSearchScreen';
import RecentLogsScreen from '../screens/RecentLogsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { authService } from '../services/authService';
import { colors } from '../constants/colors';
import type { MainTabParamList, RootStackParamList } from '../types/navigation';
import type { Session } from '../types/models';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs({ session, onLogout }: { session: Session; onLogout: () => void }) {
  return (
    <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: colors.white }}>
      <Tab.Screen name="Inicio" component={HomeScreen} initialParams={{ guard: session.user }} />
      <Tab.Screen name="Asistencia" component={AttendanceScreen} />
      <Tab.Screen name="Buscar" component={StudentSearchScreen} />
      <Tab.Screen name="Historial" component={RecentLogsScreen} />
      <Tab.Screen name="Perfil">{() => <ProfileScreen guard={session.user} onLogout={onLogout} />}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    authService.getSession().then(setSession);
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session ? (
        <Stack.Screen name="Auth">{() => <LoginScreen onLogin={setSession} />}</Stack.Screen>
      ) : (
        <Stack.Screen name="Main">{() => <MainTabs session={session} onLogout={() => setSession(null)} />}</Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
