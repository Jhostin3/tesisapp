import React from 'react';
import { Pressable, StyleSheet, TextStyle, StyleProp, ViewStyle } from 'react-native';
import AppText from './AppText';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/layout';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export default function AppButton({ title, onPress, loading, variant = 'primary', textStyle, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}
    >
      <AppText style={[styles.text, variant !== 'primary' && styles.altText, textStyle]}>
        {loading ? 'Procesando...' : title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 14, borderRadius: radius.sm, alignItems: 'center' },
  primary: { backgroundColor: colors.primaryDark },
  secondary: { backgroundColor: colors.primaryLight },
  ghost: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  pressed: { opacity: 0.82 },
  text: { color: colors.white, fontWeight: '600' },
  altText: { color: colors.primary },
});
