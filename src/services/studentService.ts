import { supabase } from './supabase';
import type { Student } from '../types/models';

const buildName = (first?: string, last?: string) => `${first || ''} ${last || ''}`.trim();
const courseText = (course: any) => (
  `${course?.nivel || ''} ${course?.nombre || course?.curso || course?.curso_nombre || ''} ${course?.paralelo || ''}`.trim() || 'Sin curso asignado'
);

const activeCourses = async (studentIds: string[]) => {
  if (!studentIds.length) return new Map<string, string>();
  const { data } = await supabase
    .from('v_estudiante_curso_actual')
    .select('*')
    .in('estudiante_id', studentIds);
  return new Map((data || []).map((item: any) => [item.estudiante_id, courseText(item)]));
};

export const studentService = {
  search: async (query: string): Promise<Student[]> => {
    const value = query.trim();
    if (!value) return [];
    const like = `%${value}%`;
    const { data: rows, error } = await supabase
      .from('estudiantes')
      .select('id,cedula,nombres,apellidos,estado')
      .or(`cedula.ilike.${like},nombres.ilike.${like},apellidos.ilike.${like}`)
      .limit(20);
    if (error || !rows?.length) return [];
    const courses = await activeCourses(rows.map((row: any) => row.id));
    return rows.map((row: any) => ({
      id: String(row.id),
      name: buildName(row.nombres, row.apellidos),
      idNumber: row.cedula || '-',
      status: row.estado || 'Activo',
      course: courses.get(row.id) || 'Sin curso asignado',
    }));
  },
};
