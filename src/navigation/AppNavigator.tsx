import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppText from '../components/atoms/AppText';
import AuthNavigator from './AuthNavigator';
import GuardNavigator from './GuardNavigator';
import StudentNavigator from './StudentNavigator';
import { authService } from '../services/authService';
import type { RootStackParamList } from '../types/navigation';
import type { Session } from '../types/models';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getSession().then(setSession).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AppText variant="subtitle">Cargando Edunova...</AppText>
      </View>
    );
  }

  const logout = () => setSession(null);
  const user = session?.user;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session ? <Stack.Screen name="Auth">{() => <AuthNavigator onLogin={setSession} />}</Stack.Screen> : null}
      {user?.role === 'guardia' ? <Stack.Screen name="Guardia">{() => <GuardNavigator guard={user} onLogout={logout} />}</Stack.Screen> : null}
      {user?.role === 'estudiante' ? <Stack.Screen name="Estudiante">{() => <StudentNavigator student={user} onLogout={logout} />}</Stack.Screen> : null}
    </Stack.Navigator>
  );
}
