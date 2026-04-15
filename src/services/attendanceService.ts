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

export const attendanceService = {
  register: async (identifier: string, type: 'entrada' | 'salida' = 'entrada'): Promise<AttendanceResult> => {
    const value = identifier.trim();
    if (!value) throw new Error('Ingresa un identificador válido');
    const { data, error } = await supabase
      .from('asistencias')
      .insert({ identificador: value, tipo: type, estado: 'Registrado', origen: 'app_guardia' })
      .select('id,estado,identificador,tipo,created_at')
      .single();
    if (error || !data) throw new Error('No se pudo registrar en asistencias');
    return {
      id: String(data.id),
      code: data.identificador || value,
      name: 'Registro de asistencia',
      status: normalizeStatus(data.estado),
      type: normalizeType(data.tipo),
      date: formatDate(data.created_at),
      time: formatTime(data.created_at),
      message: 'Asistencia registrada correctamente',
    };
  },
  recent: async (): Promise<AttendanceLog[]> => {
    const { data, error } = await supabase
      .from('asistencias')
      .select('id,estado,identificador,tipo,created_at')
      .order('created_at', { ascending: false })
      .limit(20);
    if (error || !data) return [];
    return data.map((item: any) => ({
      id: String(item.id),
      name: 'Asistencia registrada',
      status: normalizeStatus(item.estado),
      code: item.identificador || '-',
      type: normalizeType(item.tipo),
      date: formatDate(item.created_at),
      time: formatTime(item.created_at),
    }));
  },
  byStudent: async (studentId?: string): Promise<StudentAttendance[]> => {
    if (!studentId) return [];
    const { data, error } = await supabase
      .from('asistencias')
      .select('id,estado,tipo,created_at,estudiante_id')
      .eq('estudiante_id', studentId)
      .order('created_at', { ascending: false })
      .limit(20);
    if (error || !data) return [];
    return data.map((item: any) => ({
      id: String(item.id),
      date: formatDate(item.created_at),
      time: formatTime(item.created_at),
      type: normalizeType(item.tipo),
      status: normalizeStatus(item.estado),
    }));
  },
};
