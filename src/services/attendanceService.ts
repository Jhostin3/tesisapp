import { supabase } from './supabase';
import type { AttendanceLog, AttendanceResult, StudentAttendance } from '../types/models';

const formatDate = (value?: string) => {
  if (!value) return '--/--/----';
  return new Date(value).toLocaleDateString('es-EC', { day: '2-digit', month: 'short' });
};

const formatTime = (value?: string) => {
  if (!value) return '--:--';
  return new Date(value).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
};

const normalizeType = (value?: string): 'entrada' | 'salida' => {
  const text = String(value || '').toLowerCase();
  return text.includes('sal') ? 'salida' : 'entrada';
};

const normalizeStatus = (value?: string) => {
  const text = String(value || '').toLowerCase();
  if (text.includes('tarde') || text.includes('atras')) return 'Atrasado';
  if (text.includes('tiempo')) return 'A tiempo';
  return value || 'Registrado';
};

const mapLog = (item: any): AttendanceLog => ({
  id: String(item.id || item.asistencia_id || `${item.estudiante_id}-${item.fecha}-${item.hora}`),
  name: item.estudiante || item.nombre || item.estudiante_nombre || 'Asistencia registrada',
  status: normalizeStatus(item.estado),
  code: item.identificador || item.cedula || item.codigo || '-',
  type: normalizeType(item.tipo || item.accion),
  date: item.fecha || formatDate(item.created_at),
  time: item.hora || formatTime(item.created_at),
});

export const attendanceService = {
  register: async (identifier: string, type: 'entrada' | 'salida' = 'entrada'): Promise<AttendanceResult> => {
    const value = identifier.trim();
    if (!value) throw new Error('Ingresa un identificador válido');
    throw new Error('Registro móvil no disponible hasta conectar el endpoint de asistencias');
  },
  recent: async (): Promise<AttendanceLog[]> => {
    const { data, error } = await supabase
      .from('v_asistencias_estudiante')
      .select('*')
      .limit(20);
    if (error || !data) return [];
    return data.map(mapLog);
  },
  byStudent: async (studentId?: string): Promise<StudentAttendance[]> => {
    if (!studentId) return [];
    const { data, error } = await supabase
      .from('v_asistencias_estudiante')
      .select('*')
      .eq('estudiante_id', studentId)
      .limit(20);
    if (error || !data) return [];
    return data.map((item: any) => {
      const log = mapLog(item);
      return { id: log.id, date: log.date || '-', time: log.time, type: log.type || 'entrada', status: log.status };
    });
  },
};
