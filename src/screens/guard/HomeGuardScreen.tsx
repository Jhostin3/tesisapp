import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import AppCard from '../../components/atoms/AppCard';
import AppText from '../../components/atoms/AppText';
import HomeQuickActions from '../../components/organisms/HomeQuickActions';
import MetricCard from '../../components/molecules/MetricCard';
import StatusBadge from '../../components/atoms/StatusBadge';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import { spacing } from '../../constants/layout';
import { attendanceService } from '../../services/attendanceService';
import { greetingByHour } from '../../utils/time';
import type { AttendanceLog } from '../../types/models';
import type { GuardTabParamList } from '../../types/navigation';

type Props = BottomTabScreenProps<GuardTabParamList, 'Inicio'>;

export default function HomeGuardScreen({ navigation, route }: Props) {
  const guard = route.params.guard;
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const today = new Date().toLocaleDateString('es-EC', { weekday: 'long', day: '2-digit', month: 'long' });

  useFocusEffect(useCallback(() => {
    attendanceService.recent().then((items) => setLogs(items.slice(0, 3)));
  }, []));

  return (
    <DashboardTemplate title="Panel del guardia" subtitle={`${greetingByHour()}, ${guard.name}`}>
      <AppCard tone="soft">
        <AppText variant="subtitle">Resumen del turno</AppText>
        <AppText variant="caption">{today}</AppText>
        <View style={styles.metrics}>
          <MetricCard icon="business" label="Campus" value={guard.campus} helper="Punto activo" />
          <MetricCard icon="shield-checkmark" label="Estado" value={guard.status} helper="Sesión institucional" />
        </View>
      </AppCard>
      <AppCard>
        <AppText variant="subtitle">Ingresos recientes</AppText>
        {logs.map((item) => (
          <View key={item.id} style={styles.logRow}>
            <View style={styles.logCopy}>
              <AppText>{item.code}</AppText>
              <AppText variant="caption">{item.date} · {item.time}</AppText>
            </View>
            <StatusBadge label={item.type || item.status} />
          </View>
        ))}
        {!logs.length ? <AppText variant="caption">Sin registros recientes del turno.</AppText> : null}
      </AppCard>
      <HomeQuickActions onPressAction={(screen) => navigation.navigate(screen)} />
    </DashboardTemplate>
  );
}

const styles = StyleSheet.create({
  metrics: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  logRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  logCopy: { flex: 1 },
});
