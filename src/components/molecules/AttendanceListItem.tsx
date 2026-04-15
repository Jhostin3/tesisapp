import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppCard from '../atoms/AppCard';
import AppText from '../atoms/AppText';
import StatusBadge from '../atoms/StatusBadge';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import type { StudentAttendance } from '../../types/models';

type Props = { item: StudentAttendance };

export default function AttendanceListItem({ item }: Props) {
  return (
    <AppCard>
      <View style={styles.row}>
        <View style={styles.dateBox}>
          <Ionicons name="calendar" size={17} color={colors.primary} />
        </View>
        <View style={styles.copy}>
          <AppText variant="subtitle">{item.date}</AppText>
          <AppText variant="caption">{item.time}</AppText>
        </View>
        <StatusBadge label={item.type} />
      </View>
      <StatusBadge label={item.status} />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  dateBox: { width: 38, height: 38, borderRadius: 8, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
});
