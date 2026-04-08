import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
};

export default function ScreenWrapper({ children, scroll = false }: Props) {
  if (scroll) {
    return (
      <ScrollView style={styles.base} contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    );
  }
  return <SafeAreaView style={styles.base}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
  content: { gap: spacing.md, paddingBottom: spacing.xl },
});
