import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';

type Props = { title: string; subtitle?: string };

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.wrap}>
      <AppText variant="subtitle">{title}</AppText>
      {subtitle ? <AppText variant="caption">{subtitle}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 2 },
});
