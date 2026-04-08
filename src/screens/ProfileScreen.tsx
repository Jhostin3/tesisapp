import React, { useEffect, useState } from 'react';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import ProfilePanel from '../components/organisms/ProfilePanel';
import { profileService } from '../services/profileService';
import { authService } from '../services/authService';
import type { GuardProfile } from '../types/models';

type Props = { guard: GuardProfile; onLogout: () => void };

export default function ProfileScreen({ guard, onLogout }: Props) {
  const [profile, setProfile] = useState<GuardProfile>(guard);

  useEffect(() => {
    profileService.fetchProfile().then(setProfile);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    onLogout();
  };

  return (
    <DashboardTemplate title="Perfil" subtitle="Datos del guardia y sesión actual">
      <ProfilePanel profile={profile} onLogout={handleLogout} />
    </DashboardTemplate>
  );
}
