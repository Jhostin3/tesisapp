import React, { useState } from 'react';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import StudentSearchSection from '../../components/organisms/StudentSearchSection';
import { studentService } from '../../services/studentService';
import type { Student } from '../../types/models';

export default function StudentSearchScreen() {
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);

  const handleSearch = async () => {
    try {
      setStudents(await studentService.search(query));
    } catch {
      setStudents([]);
    }
  };

  return (
    <DashboardTemplate title="Buscar estudiante" subtitle="Consulta real por cédula, nombres o apellidos">
      <StudentSearchSection query={query} onChange={setQuery} onSearch={handleSearch} students={students} />
    </DashboardTemplate>
  );
}
