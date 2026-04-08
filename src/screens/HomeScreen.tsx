import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import AppText from '../components/atoms/AppText';
import HomeQuickActions from '../components/organisms/HomeQuickActions';
import { colors } from '../constants/colors';
import { radius, spacing } from '../constants/layout';
import { greetingByHour } from '../utils/time';
import type { MainTabParamList } from '../types/navigation';

type Props = BottomTabScreenProps<MainTabParamList, 'Inicio'>;

export default function HomeScreen({ navigation, route }: Props) {
  const guard = route.params.guard;
  return (
    <DashboardTemplate title="Panel principal" subtitle={`${greetingByHour()}, ${guard.name}`}>
      <View style={styles.card}>
        <AppText variant="subtitle">Resumen del turno</AppText>
        <AppText>Campus: {guard.campus}</AppText>
        <AppText>Rol: {guard.role}</AppText>
        <AppText variant="caption">Estado operativo: Activo</AppText>
      </View>
      <HomeQuickActions onPressAction={(screen) => navigation.navigate(screen)} />
    </DashboardTemplate>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.sm, gap: 4 },
});
