import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppCard from '../atoms/AppCard';
import AppText from '../atoms/AppText';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/layout';

type Props = {
  label: string;
  value: string;
  helper?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export default function MetricCard({ label, value, helper, icon }: Props) {
  return (
    <AppCard style={styles.card}>
      {icon ? (
        <View style={styles.icon}>
          <Ionicons name={icon} size={18} color={colors.primaryDark} />
        </View>
      ) : null}
      <AppText variant="caption">{label}</AppText>
      <AppText variant="subtitle" style={styles.value}>{value}</AppText>
      {helper ? <AppText variant="caption">{helper}</AppText> : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minHeight: 118 },
  icon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: { color: colors.primary },
});
