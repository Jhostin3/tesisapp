import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppCard from '../atoms/AppCard';
import AppText from '../atoms/AppText';
import ScreenWrapper from '../atoms/ScreenWrapper';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthTemplate({ title, subtitle, children }: Props) {
  return (
    <ScreenWrapper>
      <View style={styles.band} />
      <View style={styles.wrap}>
        <View style={styles.visual}>
          <View style={styles.school}>
            <View style={styles.roof} />
            <View style={styles.building}>
              <View style={styles.windowRow} />
              <View style={styles.windowRow} />
            </View>
          </View>
          <Image source={require('../../../logo/Logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.copy}>
          <AppText variant="hero" style={styles.title}>{title}</AppText>
          <AppText variant="caption" style={styles.subtitle}>{subtitle}</AppText>
        </View>
        <AppCard style={styles.card}>{children}</AppCard>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  band: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 310,
    backgroundColor: colors.primarySoft,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  wrap: { flex: 1, justifyContent: 'center', gap: spacing.md, paddingBottom: spacing.xl },
  visual: { alignItems: 'center', justifyContent: 'center', minHeight: 176 },
  school: { alignItems: 'center', opacity: 0.55 },
  roof: {
    width: 118,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
    transform: [{ rotate: '45deg' }],
  },
  building: {
    width: 158,
    height: 82,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    marginTop: -4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  windowRow: { width: 92, height: 10, borderRadius: radius.sm, backgroundColor: colors.primaryLight },
  logo: { position: 'absolute', width: 112, height: 112, top: 44 },
  copy: { gap: spacing.xs, alignItems: 'center' },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center', maxWidth: 260 },
  card: { gap: spacing.md, borderColor: colors.white, marginTop: spacing.sm },
});
