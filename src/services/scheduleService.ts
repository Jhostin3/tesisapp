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

export const scheduleService = {
  byStudent: async (studentId?: string): Promise<ScheduleBlock[]> => {
    if (!studentId) return [];
    const { data, error } = await supabase
      .from('v_horario_estudiante')
      .select('*')
      .eq('estudiante_id', studentId)
      .order('hora_inicio', { ascending: true });
    if (error || !data) return [];
    const now = new Date();
    const dbDayNum = now.getDay() === 0 ? 7 : now.getDay();
    const filtered = data.filter((row: any) => {
      if (row.dia_semana !== undefined && row.dia_semana !== null) {
        return Number(row.dia_semana) === dbDayNum;
      }
      if (row.dia !== undefined || row.day !== undefined) {
        const val = String(row.dia || row.day).toLowerCase();
        const spanish = spanishDays[dbDayNum % 7].toLowerCase();
        return val.includes(spanish) || val.includes(spanish.slice(0, 3));
      }
      return false;
    });
    const mapped = filtered.map(mapBlock);
    mapped.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
    return mapped;
  },
};
