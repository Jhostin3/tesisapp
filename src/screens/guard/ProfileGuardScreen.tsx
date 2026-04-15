import React, { useEffect, useState } from 'react';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import ProfilePanel from '../../components/organisms/ProfilePanel';
import { authService } from '../../services/authService';
import { profileService } from '../../services/profileService';
import type { GuardProfile } from '../../types/models';

type Props = { guard: GuardProfile; onLogout: () => void };

export default function ProfileGuardScreen({ guard, onLogout }: Props) {
  const [profile, setProfile] = useState<GuardProfile>(guard);

  useEffect(() => {
    profileService.fetchProfile().then((item) => {
      if (item.role === 'guardia') setProfile(item);
    });
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    onLogout();
  };

  return (
    <DashboardTemplate title="Perfil del guardia" subtitle="Datos institucionales y sesión actual">
      <ProfilePanel profile={profile} onLogout={handleLogout} />
    </DashboardTemplate>
  );
}
