import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenWrapper from '../atoms/ScreenWrapper';
import AppText from '../atoms/AppText';

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function DashboardTemplate({ title, subtitle, children }: Props) {
  return (
    <ScreenWrapper scroll>
      <View style={styles.header}>
        <AppText variant="title">{title}</AppText>
        <AppText variant="caption">{subtitle}</AppText>
      </View>
      <View style={styles.body}>{children}</View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 14, gap: 2 },
  body: { gap: 14, paddingBottom: 24 },
});
