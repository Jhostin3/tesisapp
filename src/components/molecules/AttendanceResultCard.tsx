import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppCard from '../atoms/AppCard';
import AppText from '../atoms/AppText';
import StatusBadge from '../atoms/StatusBadge';
import { spacing } from '../../constants/layout';
import type { AttendanceResult } from '../../types/models';

type Props = { result: AttendanceResult | null };

export default function AttendanceResultCard({ result }: Props) {
  if (!result) return null;
  return (
    <AppCard>
      <View style={styles.row}>
        <AppText variant="subtitle">Resultado</AppText>
        <StatusBadge label={result.status} />
      </View>
      {result.type ? <StatusBadge label={result.type} /> : null}
      <AppText>Código: {result.code}</AppText>
      <AppText>Hora: {result.time}</AppText>
      <AppText>{result.message}</AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
});
