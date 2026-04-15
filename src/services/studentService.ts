import { supabase } from './supabase';
import type { Student } from '../types/models';

const buildName = (first?: string, last?: string) => `${first || ''} ${last || ''}`.trim();
const courseText = (course: any) => (
  `${course?.nivel || ''} ${course?.nombre || ''} ${course?.paralelo || ''}`.trim() || 'Sin curso asignado'
);

const activeCourses = async (studentIds: string[]) => {
  if (!studentIds.length) return new Map<string, string>();
  const { data: links } = await supabase
    .from('estudiante_curso')
    .select('estudiante_id,curso_id,fecha_asignacion,estado')
    .in('estudiante_id', studentIds)
    .eq('estado', 'Activo');
  const courseIds = [...new Set((links || []).map((link: any) => link.curso_id))];
  const { data: courses } = await supabase.from('cursos').select('id,nombre,nivel,paralelo').in('id', courseIds);
  const courseMap = new Map((courses || []).map((course: any) => [course.id, courseText(course)]));
  return new Map((links || []).map((link: any) => [link.estudiante_id, courseMap.get(link.curso_id) || '']));
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
