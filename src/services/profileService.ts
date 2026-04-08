import type { GuardProfile } from '../types/models';

export const profileService = {
  fetchProfile: async (): Promise<GuardProfile> => {
    await new Promise((r) => setTimeout(r, 220));
    return {
      id: 'GD-001',
      name: 'Carlos Montalvo',
      email: 'guardia@edunova.edu.ec',
      status: 'En turno',
      role: 'Guardia Edunova',
      campus: 'Sede Central',
    };
  },
};
