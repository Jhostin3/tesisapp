import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppCard from '../atoms/AppCard';
import AppText from '../atoms/AppText';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import type { ScheduleBlock } from '../../types/models';

type Props = { block: ScheduleBlock };

export default function ScheduleDayCard({ block }: Props) {
  return (
    <AppCard>
      <View style={styles.row}>
        <View style={styles.time}>
          <AppText style={styles.hour}>{block.startTime}</AppText>
          <AppText variant="caption">{block.endTime}</AppText>
        </View>
        <View style={styles.copy}>
          <AppText variant="subtitle">{block.subject}</AppText>
          <AppText variant="caption">{block.place || 'Aula por confirmar'}</AppText>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  time: {
    width: 68,
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  hour: { color: colors.primary, fontWeight: '800' },
  copy: { flex: 1, gap: spacing.xxs },
});
