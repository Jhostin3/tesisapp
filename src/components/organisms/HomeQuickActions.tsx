import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionCard from '../molecules/ActionCard';
import SectionHeader from '../molecules/SectionHeader';

type Props = { onPressAction: (screen: 'Asistencia' | 'Buscar' | 'Historial') => void };

const actions = [
  { key: 'Asistencia', title: 'Registrar asistencia', subtitle: 'Ingreso o salida manual', icon: 'scan' },
  { key: 'Buscar', title: 'Buscar estudiante', subtitle: 'Datos básicos y curso actual', icon: 'search' },
  { key: 'Historial', title: 'Ver historial', subtitle: 'Eventos recientes del turno', icon: 'time' },
] as const;

export default function HomeQuickActions({ onPressAction }: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader title="Accesos rápidos" subtitle="Funciones principales del turno" />
      {actions.map((action) => (
        <ActionCard key={action.key} title={action.title} subtitle={action.subtitle} icon={action.icon} onPress={() => onPressAction(action.key)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
});
