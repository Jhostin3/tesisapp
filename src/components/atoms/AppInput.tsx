import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';

type Props = TextInputProps & { icon?: keyof typeof Ionicons.glyphMap };

export default function AppInput({ icon, ...props }: Props) {
  return (
    <View style={styles.wrap}>
      {icon ? <Ionicons name={icon} size={18} color={colors.primary} /> : null}
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.md,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
  },
});
