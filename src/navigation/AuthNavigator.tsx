import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import type { Session } from '../types/models';
import type { AuthStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type Props = { onLogin: (session: Session) => void };

export default function AuthNavigator({ onLogin }: Props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">{() => <LoginScreen onLogin={onLogin} />}</Stack.Screen>
    </Stack.Navigator>
  );
}
