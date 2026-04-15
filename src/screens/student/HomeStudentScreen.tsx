import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import AppCard from '../../components/atoms/AppCard';
import AppText from '../../components/atoms/AppText';
import MetricCard from '../../components/molecules/MetricCard';
import StudentQuickActions from '../../components/organisms/StudentQuickActions';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import { spacing } from '../../constants/layout';
import { attendanceService } from '../../services/attendanceService';
import type { StudentAttendance } from '../../types/models';
import type { StudentTabParamList } from '../../types/navigation';

type Props = BottomTabScreenProps<StudentTabParamList, 'InicioEstudiante'>;

export default function HomeStudentScreen({ navigation, route }: Props) {
  const student = route.params.student;
  const [records, setRecords] = useState<StudentAttendance[]>([]);

  useFocusEffect(useCallback(() => {
    attendanceService.byStudent(student.studentId).then(setRecords);
  }, [student.studentId]));

  const last = records[0];
  return (
    <DashboardTemplate title="Panel del estudiante" subtitle={`Bienvenido, ${student.name}`}>
      <AppCard tone="soft">
        <AppText variant="subtitle">Curso actual</AppText>
        <AppText>{student.course}</AppText>
        <AppText variant="caption">Estado de cuenta: {student.status}</AppText>
      </AppCard>
      <View style={styles.metrics}>
        <MetricCard icon="calendar" label="Asistencias" value={String(records.length)} helper="Registros recientes" />
        <MetricCard icon="time" label="Último registro" value={last?.time || '--:--'} helper={last?.status || 'Sin datos'} />
      </View>
      <StudentQuickActions onPressAction={(screen) => navigation.navigate(screen, { student })} />
    </DashboardTemplate>
  );
}

const styles = StyleSheet.create({
  metrics: { flexDirection: 'row', gap: spacing.sm },
});
