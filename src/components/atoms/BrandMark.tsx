import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';

export default function BrandMark() {
  return (
    <View style={styles.wrap}>
      <View style={styles.icon}>
        <Ionicons name="school" size={23} color={colors.white} />
      </View>
      <View>
        <AppText style={styles.brand}>Edunova</AppText>
        <AppText variant="caption">Asistencia escolar inteligente</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  icon: {
    width: 46,
    height: 46,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: { color: colors.primaryDark, fontWeight: '900', fontSize: 22 },
});
