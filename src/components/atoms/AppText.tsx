import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { colors } from '../../constants/colors';

type Variant = 'hero' | 'title' | 'subtitle' | 'body' | 'caption' | 'eyebrow';

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  style?: StyleProp<TextStyle>;
};

export default function AppText({ children, variant = 'body', style }: Props) {
  return <Text style={[styles.base, styles[variant], style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: { color: colors.text },
  hero: { fontSize: 30, fontWeight: '800', color: colors.primaryDark },
  title: { fontSize: 24, fontWeight: '800', color: colors.primaryDark },
  subtitle: { fontSize: 18, fontWeight: '700' },
  body: { fontSize: 15, fontWeight: '400' },
  caption: { fontSize: 13, color: colors.textMuted },
  eyebrow: { fontSize: 12, color: colors.accent, fontWeight: '800', textTransform: 'uppercase' },
});
