import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppCard from '../atoms/AppCard';
import AppText from '../atoms/AppText';
import StatusBadge from '../atoms/StatusBadge';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import type { Student } from '../../types/models';

type Props = { student: Student };

export default function StudentCard({ student }: Props) {
  return (
    <AppCard>
      <View style={styles.top}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={18} color={colors.primaryDark} />
        </View>
        <View style={styles.copy}>
          <AppText variant="subtitle">{student.name}</AppText>
          <AppText style={styles.item}>Curso: {student.course}</AppText>
        </View>
        <StatusBadge label={student.status} />
      </View>
      <AppText style={styles.item}>Matrícula: {student.id}</AppText>
      <AppText style={styles.item}>Cédula: {student.idNumber}</AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  avatar: { width: 40, height: 40, borderRadius: 8, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  item: { fontSize: 14 },
});
