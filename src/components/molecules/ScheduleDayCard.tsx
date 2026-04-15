import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import type { ScheduleBlock } from '../../types/models';
import AppCard from '../atoms/AppCard';
import AppText from '../atoms/AppText';

type Props = { block: ScheduleBlock };

export default function ScheduleDayCard({ block }: Props) {
  const type = (block.type || 'CLASE').toUpperCase();
  let subject = block.subject;
  let place = block.place || 'Aula por confirmar';
  const cardStyle: any = {};
  const leftBarColor = type === 'RECREO' ? colors.yellow : type === 'ALMUERZO' ? colors.peach : type === 'CLUB' ? colors.lavender : colors.primaryLight;
  if (type === 'RECREO') {
    subject = 'Recreo';
    place = '';
  } else if (type === 'ALMUERZO') {
    subject = 'Almuerzo';
    place = '';
  } else if (type === 'CLUB') {
    subject = block.title || block.subject || 'Club';
    place = block.place || 'Club';
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.leftBar, { backgroundColor: leftBarColor }]} />
      <AppCard style={[styles.card, cardStyle]}>
        <View style={styles.row}>
          <View style={styles.time}>
            <AppText style={styles.hour}>{block.startTime}</AppText>
            <AppText variant="caption">{block.endTime}</AppText>
          </View>
          <View style={styles.copy}>
            <AppText variant="subtitle" style={styles.title}>{subject}</AppText>
            {place ? <AppText variant="caption">{place}</AppText> : null}
          </View>
        </View>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'stretch' },
  leftBar: { width: 8, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  card: { flex: 1, borderRadius: 12, padding: 12 },
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  time: {
    width: 84,
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  hour: { color: colors.primary, fontWeight: '900', fontSize: 16 },
  copy: { flex: 1, gap: spacing.xxs },
  title: { fontSize: 16 },
});
