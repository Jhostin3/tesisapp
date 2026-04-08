import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { colors } from '../../constants/colors';

type Variant = 'title' | 'subtitle' | 'body' | 'caption';

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
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400' },
  caption: { fontSize: 13, color: colors.textMuted },
});
