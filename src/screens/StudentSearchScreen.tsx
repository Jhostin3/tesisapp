import React, { useState } from 'react';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import StudentSearchSection from '../components/organisms/StudentSearchSection';
import { studentService } from '../services/studentService';
import type { Student } from '../types/models';

export default function StudentSearchScreen() {
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);

  const handleSearch = async () => {
    const results = await studentService.search(query);
    setStudents(results);
  };

  return (
    <DashboardTemplate title="Buscar estudiante" subtitle="Consulta rápida de datos básicos">
      <StudentSearchSection query={query} onChange={setQuery} onSearch={handleSearch} students={students} />
    </DashboardTemplate>
  );
}
