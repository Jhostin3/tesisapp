import React, { useState } from 'react';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import AttendanceForm from '../components/organisms/AttendanceForm';
import { attendanceService } from '../services/attendanceService';
import type { AttendanceResult } from '../types/models';

export default function AttendanceScreen() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AttendanceResult | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      if (!input.trim()) return;
      setLoading(true);
      const response = await attendanceService.register(input);
      setResult(response);
      setInput('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardTemplate title="Asistencia" subtitle="Registro manual o simulado">
      <AttendanceForm value={input} onChange={setInput} onRegister={register} result={result} loading={loading} />
    </DashboardTemplate>
  );
}
