import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../atoms/ScreenWrapper';
import AppText from '../atoms/AppText';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function DashboardTemplate({ title, subtitle, children }: Props) {
  return (
    <ScreenWrapper scroll>
      <View style={styles.header}>
        <View style={styles.headerLine} />
        <View style={styles.headerCopy}>
          <AppText variant="eyebrow" style={styles.eyebrow}>Edunova</AppText>
          <AppText variant="title" style={styles.title}>{title}</AppText>
          <AppText variant="caption" style={styles.subtitle}>{subtitle}</AppText>
        </View>
        <View style={styles.icon}>
          <Ionicons name="sparkles" size={20} color={colors.white} />
        </View>
      </View>
      <View style={styles.body}>{children}</View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
    overflow: 'hidden',
  },
  headerLine: { width: 5, borderRadius: radius.sm, backgroundColor: colors.accent },
  headerCopy: { flex: 1, gap: spacing.xs },
  icon: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: { color: colors.accentLight },
  title: { color: colors.white },
  subtitle: { color: colors.primaryLight, maxWidth: 290 },
  body: { gap: spacing.md, paddingBottom: spacing.xl },
});
