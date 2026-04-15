import type { ScheduleBlock } from '../types/models';
import { supabase } from './supabase';

const timeText = (value?: string) => String(value || '').slice(0, 5) || '--:--';

const mapBlock = (row: any): ScheduleBlock => ({
  id: String(row.id || row.horario_id || `${row.dia_semana}-${row.bloque_numero}-${row.hora_inicio}`),
  day: row.dia_semana || row.dia || row.day || 'Día por definir',
  subject: row.titulo || row.materia_nombre || row.materia || row.asignatura || row.nombre_materia || 'Materia por definir',
  startTime: timeText(row.hora_inicio || row.start_time),
  endTime: timeText(row.hora_fin || row.end_time),
  place: row.aula || row.club || row.place || row.ubicacion,
  type: row.tipo || row.type || 'CLASE',
  title: row.titulo || row.nombre || row.title,
  blockNumber: Number(row.bloque_numero || row.block_number || 0),
});

const spanishDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const isCurrentDay = (row: any) => {
  const now = new Date();
  const dayNum = now.getDay();
  const candidates = [
    String(row.dia_semana),
    String(row.dia),
    String(row.day),
  ].filter(Boolean).map(String);
  if (!candidates.length) return false;
  const spanish = spanishDays[dayNum];
  return candidates.some((c) => {
    const lower = c.toLowerCase();
    if (Number(c) === dayNum) return true;
    if (Number(c) === dayNum + 1) return true;
    if (lower.includes(spanish.toLowerCase())) return true;
    if (lower.includes(spanish.slice(0, 3).toLowerCase())) return true;
    return false;
  });
};

export const scheduleService = {
  byStudent: async (studentId?: string): Promise<ScheduleBlock[]> => {
    if (!studentId) return [];
    const { data, error } = await supabase
      .from('v_horario_estudiante')
      .select('*')
      .eq('estudiante_id', studentId)
      .order('bloque_numero', { ascending: true });
    if (error || !data) return [];
    const filtered = data.filter(isCurrentDay);
    const mapped = filtered.map(mapBlock);
    mapped.sort((a, b) => (a.blockNumber || 0) - (b.blockNumber || 0));
    return mapped;
  },
};
