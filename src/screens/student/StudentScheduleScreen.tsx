import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../../components/atoms/AppText';
import EmptyState from '../../components/molecules/EmptyState';
import ScheduleSection from '../../components/organisms/ScheduleSection';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import { spacing } from '../../constants/layout';
import { scheduleService } from '../../services/scheduleService';
import type { ScheduleBlock } from '../../types/models';
import type { StudentTabParamList } from '../../types/navigation';

type Props = BottomTabScreenProps<StudentTabParamList, 'HorarioEstudiante'>;

export default function StudentScheduleScreen({ route }: Props) {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>([]);
  const student = route.params.student;

  useFocusEffect(useCallback(() => {
    scheduleService.byStudent(student.studentId).then(setBlocks);
  }, [student.studentId]));
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const now = new Date();
  const dayName = days[now.getDay()];
  return (
    <DashboardTemplate title="Horario" subtitle={`${student.course} · clases y bloques activos`}>
      <View style={styles.list}>
        {blocks.length ? (
          <>
            <View style={styles.header}>
              <AppText variant="hero">{dayName}</AppText>
              <AppText variant="caption">{blocks.length} bloques programados</AppText>
            </View>
            <ScheduleSection day={dayName} blocks={blocks} showDayHeader={false} />
          </>
        ) : (
          <EmptyState title="Hoy no tienes actividades" subtitle="" />
        )}
      </View>
    </DashboardTemplate>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.sm },
  header: { paddingHorizontal: spacing.xs, gap: spacing.xs },
});
