import { supabase } from './supabase';
import { profileService } from './profileService';
import type { Session } from '../types/models';

const toSession = async (token: string, userId: string): Promise<Session> => {
  const user = await profileService.fetchProfile(userId);
  return { token, user };
};

export const authService = {
  login: async ({ email, password }: { email: string; password: string }): Promise<Session> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) throw new Error('Ingresa correo institucional y contraseña');
    const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
    if (error || !data.session) throw new Error(error?.message || 'No se pudo iniciar sesión');
    return toSession(data.session.access_token, data.user.id);
  },
  logout: async (): Promise<boolean> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return true;
  },
  getSession: async (): Promise<Session | null> => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return null;
    try {
      return await toSession(data.session.access_token, data.session.user.id);
    } catch {
      await supabase.auth.signOut();
      return null;
    }
  },
};
