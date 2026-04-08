import type { GuardProfile } from './models';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Inicio: { guard: GuardProfile };
  Asistencia: undefined;
  Buscar: undefined;
  Historial: undefined;
  Perfil: { guard: GuardProfile };
};
