import React from 'react';
import { Pressable, StyleSheet, TextStyle, StyleProp } from 'react-native';
import AppText from './AppText';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  textStyle?: StyleProp<TextStyle>;
};

export default function AppButton({ title, onPress, loading, variant = 'primary', textStyle }: Props) {
  const secondary = variant === 'secondary';
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[styles.base, secondary ? styles.secondary : styles.primary]}
    >
      <AppText style={[styles.text, secondary ? styles.secondaryText : undefined, textStyle]}>
        {loading ? 'Procesando...' : title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: spacing.sm, borderRadius: radius.md, alignItems: 'center' },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.primaryLight },
  text: { color: colors.white, fontWeight: '600' },
  secondaryText: { color: colors.primary },
});
