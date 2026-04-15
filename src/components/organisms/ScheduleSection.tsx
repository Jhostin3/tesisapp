import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import type { ScheduleBlock } from '../../types/models';
import AppText from '../atoms/AppText';
import ScheduleDayCard from '../molecules/ScheduleDayCard';

type Props = { day: string; blocks: ScheduleBlock[]; showDayHeader?: boolean };

export default function ScheduleSection({ day, blocks, showDayHeader = true }: Props) {
  return (
    <View style={styles.section}>
      {showDayHeader ? (
        <View style={styles.head}>
          <View>
            <AppText variant="title" style={styles.day}>{day}</AppText>
            <AppText variant="caption">{blocks.length} bloques</AppText>
          </View>
        </View>
      ) : null}
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
