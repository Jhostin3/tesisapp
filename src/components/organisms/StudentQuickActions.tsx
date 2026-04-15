import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionCard from '../molecules/ActionCard';
import SectionHeader from '../molecules/SectionHeader';

type Props = { onPressAction: (screen: 'AsistenciasEstudiante' | 'HorarioEstudiante') => void };

const actions = [
  { key: 'AsistenciasEstudiante', title: 'Mis asistencias', subtitle: 'Entradas, salidas y puntualidad', icon: 'calendar' },
  { key: 'HorarioEstudiante', title: 'Horario semanal', subtitle: 'Clases, bloques y clubes', icon: 'book' },
] as const;

export default function StudentQuickActions({ onPressAction }: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader title="Accesos del estudiante" subtitle="Consulta tu actividad académica" />
      {actions.map((action) => (
        <ActionCard key={action.key} title={action.title} subtitle={action.subtitle} icon={action.icon} onPress={() => onPressAction(action.key)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
});
