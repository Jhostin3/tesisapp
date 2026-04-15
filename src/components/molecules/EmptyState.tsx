import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../atoms/AppText';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';

type Props = {
  title: string;
  subtitle: string;
};

export default function EmptyState({ title, subtitle }: Props) {
  return (
    <View style={styles.box}>
      <AppText variant="subtitle">{title}</AppText>
      <AppText variant="caption">{subtitle}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.xxs,
  },
});
