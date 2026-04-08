import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppInput from '../atoms/AppInput';
import AppButton from '../atoms/AppButton';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onSearch: () => void;
  placeholder: string;
};

export default function SearchBar({ value, onChangeText, onSearch, placeholder }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.inputWrap}>
        <AppInput value={value} onChangeText={onChangeText} placeholder={placeholder} />
      </View>
      <View style={styles.buttonWrap}>
        <AppButton title="Buscar" onPress={onSearch} variant="secondary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10 },
  inputWrap: { flex: 1 },
  buttonWrap: { width: 110 },
});
