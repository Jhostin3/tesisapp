import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStudentScreen from '../screens/student/HomeStudentScreen';
import ProfileStudentScreen from '../screens/student/ProfileStudentScreen';
import StudentAttendanceScreen from '../screens/student/StudentAttendanceScreen';
import StudentScheduleScreen from '../screens/student/StudentScheduleScreen';
import { colors } from '../constants/colors';
import type { StudentProfile } from '../types/models';
import type { StudentTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<StudentTabParamList>();
const icons = {
  InicioEstudiante: 'school',
  AsistenciasEstudiante: 'calendar',
  HorarioEstudiante: 'book',
  PerfilEstudiante: 'person',
} as const;

type Props = { student: StudentProfile; onLogout: () => void };

export default function StudentNavigator({ student, onLogout }: Props) {
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
      <Tab.Screen name="InicioEstudiante" options={{ title: 'Inicio' }} component={HomeStudentScreen} initialParams={{ student }} />
      <Tab.Screen name="AsistenciasEstudiante" options={{ title: 'Asistencias' }} component={StudentAttendanceScreen} initialParams={{ student }} />
      <Tab.Screen name="HorarioEstudiante" options={{ title: 'Horario' }} component={StudentScheduleScreen} initialParams={{ student }} />
      <Tab.Screen name="PerfilEstudiante" options={{ title: 'Perfil' }}>{() => <ProfileStudentScreen student={student} onLogout={onLogout} />}</Tab.Screen>
    </Tab.Navigator>
  );
}
