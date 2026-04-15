import { supabase } from './supabase';
import type { ScheduleBlock } from '../types/models';

const timeText = (value?: string) => String(value || '').slice(0, 5) || '--:--';

const mapBlock = (row: any): ScheduleBlock => ({
  id: String(row.id),
  day: row.dia || row.day || 'Día por definir',
  subject: row.materia || row.asignatura || row.subject || 'Materia por definir',
  startTime: timeText(row.hora_inicio || row.start_time),
  endTime: timeText(row.hora_fin || row.end_time),
  place: row.aula || row.club || row.place,
});

export const scheduleService = {
  byStudent: async (studentId?: string): Promise<ScheduleBlock[]> => {
    if (!studentId) return [];
    const { data: link } = await supabase
      .from('estudiante_curso')
      .select('curso_id')
      .eq('estudiante_id', studentId)
      .eq('estado', 'Activo')
      .limit(1)
      .maybeSingle();
    if (!link?.curso_id) return [];
    const { data, error } = await supabase
      .from('horarios')
      .select('*')
      .eq('curso_id', link.curso_id)
      .order('dia', { ascending: true });
    if (error || !data) return [];
    return data.map(mapBlock);
  },
};
