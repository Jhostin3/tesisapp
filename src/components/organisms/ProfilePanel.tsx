import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppButton from '../atoms/AppButton';
import SectionHeader from '../molecules/SectionHeader';
import InfoRow from '../molecules/InfoRow';
import StatusBadge from '../atoms/StatusBadge';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import type { GuardProfile } from '../../types/models';

type Props = { profile: GuardProfile; onLogout: () => void };

export default function ProfilePanel({ profile, onLogout }: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader title="Cuenta del guardia" subtitle="Información institucional" />
      <View style={styles.card}>
        <StatusBadge label={profile.status} />
        <InfoRow label="Nombre" value={profile.name} />
        <InfoRow label="Correo" value={profile.email} />
        <InfoRow label="Rol" value={profile.role} />
        <InfoRow label="Campus" value={profile.campus} />
      </View>
      <AppButton title="Cerrar sesión" variant="secondary" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  card: { backgroundColor: colors.white, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.sm, gap: 8 },
});
