import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';

type Props = { label: string };

const tone: Record<string, { bg: string; text: string }> = {
  Registrado: { bg: '#E4F6EC', text: colors.success },
  Activo: { bg: '#E4F6EC', text: colors.success },
  Pendiente: { bg: '#FFF4DF', text: colors.warning },
  Observado: { bg: '#FFF4DF', text: colors.warning },
  'En turno': { bg: '#E8F0FF', text: colors.primary },
};

export default function StatusBadge({ label }: Props) {
  const cfg = tone[label] || { bg: '#FFE7E7', text: colors.error };
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <AppText style={[styles.text, { color: cfg.text }]}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radius.sm },
  text: { fontSize: 12, fontWeight: '600' },
});
