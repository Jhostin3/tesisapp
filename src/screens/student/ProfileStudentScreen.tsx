import React from 'react';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import ProfilePanel from '../../components/organisms/ProfilePanel';
import { authService } from '../../services/authService';
import type { StudentProfile } from '../../types/models';

type Props = { student: StudentProfile; onLogout: () => void };

export default function ProfileStudentScreen({ student, onLogout }: Props) {
  const handleLogout = async () => {
    await authService.logout();
    onLogout();
  };

  return (
    <DashboardTemplate title="Perfil del estudiante" subtitle="Datos académicos e institucionales">
      <ProfilePanel profile={student} onLogout={handleLogout} />
    </DashboardTemplate>
  );
}
