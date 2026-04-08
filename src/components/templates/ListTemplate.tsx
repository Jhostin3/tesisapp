import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenWrapper from '../atoms/ScreenWrapper';
import AppText from '../atoms/AppText';

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function ListTemplate({ title, subtitle, children }: Props) {
  return (
    <ScreenWrapper>
      <View style={styles.wrap}>
        <View style={styles.head}>
          <AppText variant="title">{title}</AppText>
          <AppText variant="caption">{subtitle}</AppText>
        </View>
        <View style={styles.list}>{children}</View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  head: { gap: 2, marginBottom: 12 },
  list: { flex: 1 },
});
