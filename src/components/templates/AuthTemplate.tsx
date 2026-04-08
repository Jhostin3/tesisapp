import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenWrapper from '../atoms/ScreenWrapper';
import AppText from '../atoms/AppText';

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthTemplate({ title, subtitle, children }: Props) {
  return (
    <ScreenWrapper>
      <View style={styles.box}>
        <AppText variant="title">{title}</AppText>
        <AppText variant="caption" style={styles.subtitle}>{subtitle}</AppText>
        {children}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, justifyContent: 'center', gap: 14 },
  subtitle: { marginBottom: 2 },
});
