import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppButton from '../atoms/AppButton';
import SectionHeader from '../molecules/SectionHeader';

type Props = { onPressAction: (screen: 'Asistencia' | 'Buscar' | 'Historial') => void };

const actions = [
  { key: 'Asistencia', label: 'Registrar asistencia' },
  { key: 'Buscar', label: 'Buscar estudiante' },
  { key: 'Historial', label: 'Ver historial reciente' },
] as const;

export default function HomeQuickActions({ onPressAction }: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader title="Accesos rápidos" subtitle="Funciones principales del turno" />
      {actions.map((action) => (
        <AppButton key={action.key} title={action.label} variant="secondary" onPress={() => onPressAction(action.key)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
});
