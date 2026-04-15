import type { GuardProfile, StudentProfile } from './models';

export type RootStackParamList = {
  Auth: undefined;
  Guardia: undefined;
  Estudiante: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type GuardTabParamList = {
  Inicio: { guard: GuardProfile };
  Asistencia: undefined;
  Buscar: undefined;
  Historial: undefined;
  Perfil: { guard: GuardProfile };
};

export type StudentTabParamList = {
  InicioEstudiante: { student: StudentProfile };
  AsistenciasEstudiante: { student: StudentProfile };
  HorarioEstudiante: { student: StudentProfile };
  PerfilEstudiante: { student: StudentProfile };
};
