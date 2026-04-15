import React, { useState } from 'react';
import AttendanceForm from '../../components/organisms/AttendanceForm';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import { attendanceService } from '../../services/attendanceService';
import type { AttendanceResult } from '../../types/models';

export default function AttendanceScreen() {
  const [input, setInput] = useState('');
  const [type, setType] = useState<'entrada' | 'salida'>('entrada');
  const [result, setResult] = useState<AttendanceResult | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      if (!input.trim()) return;
      setLoading(true);
      const response = await attendanceService.register(input, type);
      setResult(response);
      setInput('');
    } catch (err) {
      setResult({
        id: `ERR-${Date.now()}`,
        code: input,
        name: 'Registro fallido',
        status: 'Observado',
        type,
        time: new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' }),
        message: err instanceof Error ? err.message : 'No se pudo registrar asistencia',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardTemplate title="Asistencia" subtitle="Registro de ingreso y salida del estudiante">
      <AttendanceForm
        value={input}
        type={type}
        onTypeChange={setType}
        onChange={setInput}
        onRegister={register}
        result={result}
        loading={loading}
      />
    </DashboardTemplate>
  );
}
