import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppButton from '../atoms/AppButton';
import SectionHeader from '../molecules/SectionHeader';
import InfoRow from '../molecules/InfoRow';
import StatusBadge from '../atoms/StatusBadge';
import AppCard from '../atoms/AppCard';
import type { SessionUser } from '../../types/models';

type Props = { profile: SessionUser; onLogout: () => void };

export default function ProfilePanel({ profile, onLogout }: Props) {
  const title = profile.role === 'guardia' ? 'Cuenta del guardia' : 'Cuenta del estudiante';
  return (
    <View style={styles.wrap}>
      <SectionHeader title={title} subtitle="Información institucional" />
      <AppCard>
        <StatusBadge label={profile.status} />
        <InfoRow label="Nombre" value={profile.name} />
        <InfoRow label="Correo" value={profile.email} />
        <InfoRow label="Rol" value={profile.role} />
        <InfoRow label="Cédula" value={profile.cedula || '-'} />
        <InfoRow label="Referencia" value={profile.role === 'guardia' ? profile.campus : profile.course} />
      </AppCard>
      <AppButton title="Cerrar sesión" variant="secondary" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
});
