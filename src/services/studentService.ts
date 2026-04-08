import { students } from '../data/students';
import type { Student } from '../types/models';

export const studentService = {
  search: async (query: string): Promise<Student[]> => {
    await new Promise((r) => setTimeout(r, 280));
    if (!query.trim()) return [];
    const value = query.toLowerCase().trim();
    return students.filter(
      (item) => item.name.toLowerCase().includes(value) || item.idNumber.includes(value)
    );
  },
};
