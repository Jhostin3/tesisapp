import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import StatusBadge from '../atoms/StatusBadge';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import type { Student } from '../../types/models';

type Props = { student: Student };

export default function StudentCard({ student }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <AppText variant="subtitle">{student.name}</AppText>
        <StatusBadge label={student.status} />
      </View>
      <AppText style={styles.item}>Matrícula: {student.id}</AppText>
      <AppText style={styles.item}>Cédula: {student.idNumber}</AppText>
      <AppText style={styles.item}>Curso: {student.course}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 6,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  item: { fontSize: 14 },
});
