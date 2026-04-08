import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import StatusBadge from '../atoms/StatusBadge';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import type { AttendanceResult } from '../../types/models';

type Props = { result: AttendanceResult | null };

export default function AttendanceResultCard({ result }: Props) {
  if (!result) return null;
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <AppText variant="subtitle">Resultado</AppText>
        <StatusBadge label={result.status} />
      </View>
      <AppText>Código: {result.code}</AppText>
      <AppText>Hora: {result.time}</AppText>
      <AppText>{result.message}</AppText>
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
    gap: 8,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
