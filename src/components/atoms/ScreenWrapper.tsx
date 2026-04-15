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
      <SafeAreaView style={styles.base}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return <SafeAreaView style={[styles.base, styles.content]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.background },
  content: { gap: spacing.md, padding: spacing.md, paddingBottom: spacing.xl },
});
