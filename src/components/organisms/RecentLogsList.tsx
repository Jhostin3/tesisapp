import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import AppCard from '../atoms/AppCard';
import AppText from '../atoms/AppText';
import SectionHeader from '../molecules/SectionHeader';
import StatusBadge from '../atoms/StatusBadge';
import EmptyState from '../molecules/EmptyState';
import { spacing } from '../../constants/layout';
import type { AttendanceLog } from '../../types/models';

type Props = { logs: AttendanceLog[] };

function LogItem({ item }: { item: AttendanceLog }) {
  return (
    <AppCard>
      <View style={styles.row}>
        <AppText variant="subtitle">{item.name}</AppText>
        <StatusBadge label={item.status} />
      </View>
      <AppText variant="caption">Fecha: {item.date || '-'}</AppText>
      <AppText variant="caption">Hora: {item.time}</AppText>
      <AppText variant="caption">Código: {item.code}</AppText>
    </AppCard>
  );
}

export default function RecentLogsList({ logs }: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader title="Historial reciente" subtitle="Últimos registros" />
      {!logs.length ? <EmptyState title="Sin registros" subtitle="Los eventos aparecerán al registrar asistencias." /> : null}
      <FlatList data={logs} keyExtractor={(item) => item.id} renderItem={({ item }) => <LogItem item={item} />} ItemSeparatorComponent={() => <View style={styles.separator} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, gap: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  separator: { height: 10 },
});
