import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ListTemplate from '../../components/templates/ListTemplate';
import RecentLogsList from '../../components/organisms/RecentLogsList';
import { attendanceService } from '../../services/attendanceService';
import type { AttendanceLog } from '../../types/models';

export default function RecentLogsScreen() {
  const [logs, setLogs] = useState<AttendanceLog[]>([]);

  const load = useCallback(async () => {
    setLogs(await attendanceService.recent());
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  return (
    <ListTemplate title="Registros recientes" subtitle="Últimos eventos del control de ingreso">
      <RecentLogsList logs={logs} />
    </ListTemplate>
  );
}
