import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';

type Props = { label: string; value: string };

export default function InfoRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <AppText variant="caption">{label}</AppText>
      <AppText style={styles.value}>{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { gap: 3 },
  value: { fontWeight: '600' },
});
