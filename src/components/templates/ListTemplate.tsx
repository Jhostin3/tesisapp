import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenWrapper from '../atoms/ScreenWrapper';
import AppText from '../atoms/AppText';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function ListTemplate({ title, subtitle, children }: Props) {
  return (
    <ScreenWrapper scroll>
      <View style={styles.wrap}>
        <View style={styles.head}>
          <AppText variant="eyebrow">Edunova</AppText>
          <AppText variant="title">{title}</AppText>
          <AppText variant="caption">{subtitle}</AppText>
        </View>
        <View style={styles.list}>{children}</View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, gap: spacing.md },
  head: {
    gap: spacing.xs,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  list: { flex: 1 },
});
