import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import SectionHeader from '../molecules/SectionHeader';
import StatusBadge from '../atoms/StatusBadge';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import type { AttendanceLog } from '../../types/models';

type Props = { logs: AttendanceLog[] };

function LogItem({ item }: { item: AttendanceLog }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <AppText variant="subtitle">{item.name}</AppText>
        <StatusBadge label={item.status} />
      </View>
      <AppText variant="caption">Hora: {item.time}</AppText>
      <AppText variant="caption">Código: {item.code}</AppText>
    </View>
  );
}

export default function RecentLogsList({ logs }: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader title="Historial reciente" subtitle="Últimos registros" />
      <FlatList data={logs} keyExtractor={(item) => item.id} renderItem={({ item }) => <LogItem item={item} />} ItemSeparatorComponent={() => <View style={styles.separator} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  card: { backgroundColor: colors.white, borderRadius: radius.md, borderColor: colors.border, borderWidth: 1, padding: spacing.sm, gap: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  separator: { height: 10 },
});
