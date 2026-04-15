import { supabase } from './supabase';
import type { GuardProfile, RoleName, SessionUser, StudentProfile } from '../types/models';

const fullName = (first?: string | null, last?: string | null) => `${first || ''} ${last || ''}`.trim();
const normalizeRole = (value?: string | null): RoleName => {
  const role = String(value || '').toLowerCase();
  if (role.includes('estudiante')) return 'estudiante';
  if (role.includes('guardia')) return 'guardia';
  throw new Error('Este servicio móvil solo está disponible para guardias y estudiantes');
};

const courseLabel = (course: any) => (
  `${course?.nivel || ''} ${course?.nombre || ''} ${course?.paralelo || ''}`.trim() || 'Curso por asignar'
);

const fetchCourse = async (studentId?: string) => {
  if (!studentId) return undefined;
  const { data: link } = await supabase
    .from('estudiante_curso')
    .select('curso_id,estado,fecha_asignacion')
    .eq('estudiante_id', studentId)
    .eq('estado', 'Activo')
    .order('fecha_asignacion', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!link?.curso_id) return undefined;
  const { data: course } = await supabase
    .from('cursos')
    .select('id,nombre,nivel,paralelo')
    .eq('id', link.curso_id)
    .maybeSingle();
  return courseLabel(course);
};

const mapGuard = (profile: any, personal: any): GuardProfile => ({
  id: profile.id,
  role: 'guardia',
  name: fullName(personal?.nombres, personal?.apellidos) || profile.email,
  firstName: personal?.nombres,
  lastName: personal?.apellidos,
  email: personal?.correo_institucional || profile.email,
  status: personal?.estado || profile.estado || 'Activo',
  cedula: personal?.cedula,
  campus: 'Edunova',
  personId: personal?.id,
});

const mapStudent = async (profile: any, student: any): Promise<StudentProfile> => ({
  id: profile.id,
  role: 'estudiante',
  name: fullName(student?.nombres, student?.apellidos) || profile.email,
  firstName: student?.nombres,
  lastName: student?.apellidos,
  email: student?.correo_institucional || profile.email,
  status: student?.estado || profile.estado || 'Activo',
  cedula: student?.cedula,
  course: (await fetchCourse(student?.id)) || 'Curso por asignar',
  studentId: student?.id,
});

export const profileService = {
  fetchProfile: async (userId?: string): Promise<SessionUser> => {
    const auth = await supabase.auth.getUser();
    const uid = userId || auth.data.user?.id;
    if (!uid) throw new Error('Sesión no encontrada');

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id,email,rol_id,estado')
      .eq('id', uid)
      .single();
    if (error || !profile) throw new Error('No se encontró el perfil institucional');

    const { data: role } = await supabase.from('roles').select('id,nombre').eq('id', profile.rol_id).maybeSingle();
    const roleName = normalizeRole(role?.nombre);

    if (roleName === 'estudiante') {
      const { data: student } = await supabase.from('estudiantes').select('*').eq('user_id', uid).maybeSingle();
      return mapStudent(profile, student);
    }

    const { data: personal } = await supabase.from('personal').select('*').eq('user_id', uid).maybeSingle();
    return mapGuard(profile, personal);
  },
};
