import { nowTime } from '../utils/time';
import { recentLogs } from '../data/recentLogs';
import type { AttendanceLog, AttendanceResult } from '../types/models';

const states = ['Registrado', 'Observado'];

let logs: AttendanceLog[] = [...recentLogs];

export const attendanceService = {
  register: async (identifier: string): Promise<AttendanceResult> => {
    await new Promise((r) => setTimeout(r, 350));
    if (!identifier.trim()) throw new Error('Ingresa un identificador válido');
    const status = states[Math.floor(Math.random() * states.length)];
    const entry: AttendanceLog = {
      id: `LG-${Date.now()}`,
      name: 'Estudiante identificado',
      time: nowTime(),
      status,
      code: identifier.trim(),
    };
    logs = [entry, ...logs].slice(0, 12);
    const message = status === 'Registrado' ? 'Asistencia validada' : 'Marcado para revisión';
    return { ...entry, message };
  },
  recent: async (): Promise<AttendanceLog[]> => {
    await new Promise((r) => setTimeout(r, 180));
    return logs;
  },
};
