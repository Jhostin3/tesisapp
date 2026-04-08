import type { GuardProfile, Session } from '../types/models';

let activeSession: Session | null = null;

const guardMock: GuardProfile = {
  id: 'GD-001',
  name: 'Carlos Montalvo',
  email: 'guardia@edunova.edu.ec',
  status: 'En turno',
  role: 'Guardia Edunova',
  campus: 'Sede Central',
};

export const authService = {
  login: async ({ email, password }: { email: string; password: string }): Promise<Session> => {
    await new Promise((r) => setTimeout(r, 450));
    if (!email || !password) throw new Error('Credenciales incompletas');
    activeSession = { token: 'mock-token', user: guardMock };
    return activeSession;
  },
  logout: async (): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 250));
    activeSession = null;
    return true;
  },
  getSession: async (): Promise<Session | null> => {
    await new Promise((r) => setTimeout(r, 120));
    return activeSession;
  },
};
