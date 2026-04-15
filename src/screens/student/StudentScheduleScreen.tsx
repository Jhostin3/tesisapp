import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
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

  const groups = blocks.reduce<Record<string, ScheduleBlock[]>>((acc, block) => {
    acc[block.day] = [...(acc[block.day] || []), block];
    return acc;
  }, {});

  return (
    <DashboardTemplate title="Horario" subtitle={`${student.course} · clases y bloques activos`}>
      <View style={styles.list}>
        {Object.entries(groups).map(([day, items]) => <ScheduleSection key={day} day={day} blocks={items} />)}
        {!blocks.length ? <EmptyState title="Horario por publicar" subtitle="La estructura queda lista para horarios y clubes." /> : null}
      </View>
    </DashboardTemplate>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.sm },
});
