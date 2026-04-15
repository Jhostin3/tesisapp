import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../atoms/AppText';
import ScheduleDayCard from '../molecules/ScheduleDayCard';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import type { ScheduleBlock } from '../../types/models';

type Props = { day: string; blocks: ScheduleBlock[] };

export default function ScheduleSection({ day, blocks }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.head}>
        <AppText variant="subtitle" style={styles.day}>{day}</AppText>
        <AppText variant="caption">{blocks.length} bloques</AppText>
      </View>
      <View style={styles.blocks}>
        {blocks.map((block) => <ScheduleDayCard key={block.id} block={block} />)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.sm },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  day: { color: colors.primaryDark },
  blocks: { gap: spacing.sm },
});
