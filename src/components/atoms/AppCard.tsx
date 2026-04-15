import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { radius, shadow, spacing } from '../../constants/layout';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  tone?: 'default' | 'soft' | 'accent';
};

export default function AppCard({ children, style, tone = 'default' }: Props) {
  return <View style={[styles.card, styles[tone], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadow.card,
  },
  default: {},
  soft: { backgroundColor: colors.primarySoft },
  accent: { backgroundColor: colors.accentLight, borderColor: '#C5EEE1' },
});
