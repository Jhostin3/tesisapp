import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import AttendanceListItem from '../../components/molecules/AttendanceListItem';
import EmptyState from '../../components/molecules/EmptyState';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import { spacing } from '../../constants/layout';
import { attendanceService } from '../../services/attendanceService';
import type { StudentAttendance } from '../../types/models';
import type { StudentTabParamList } from '../../types/navigation';

type Props = BottomTabScreenProps<StudentTabParamList, 'AsistenciasEstudiante'>;

export default function StudentAttendanceScreen({ route }: Props) {
  const [items, setItems] = useState<StudentAttendance[]>([]);
  const student = route.params.student;

  useFocusEffect(useCallback(() => {
    attendanceService.byStudent(student.studentId).then(setItems);
  }, [student.studentId]));

  return (
    <DashboardTemplate title="Mis asistencias" subtitle="Entradas, salidas y puntualidad reciente">
      <View style={styles.list}>
        {items.map((item) => <AttendanceListItem key={item.id} item={item} />)}
        {!items.length ? <EmptyState title="Sin asistencias" subtitle="Aún no hay registros asociados a tu cuenta." /> : null}
      </View>
    </DashboardTemplate>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.sm },
});
