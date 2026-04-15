import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppInput from '../atoms/AppInput';
import AppButton from '../atoms/AppButton';
import SectionHeader from '../molecules/SectionHeader';
import AttendanceResultCard from '../molecules/AttendanceResultCard';
import type { AttendanceResult } from '../../types/models';

type Props = {
  value: string;
  type: 'entrada' | 'salida';
  onTypeChange: (value: 'entrada' | 'salida') => void;
  onChange: (value: string) => void;
  onRegister: () => void;
  result: AttendanceResult | null;
  loading: boolean;
};

export default function AttendanceForm({ value, type, onTypeChange, onChange, onRegister, result, loading }: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader title="Registro de asistencia" subtitle="Ingrese UID, código o matrícula" />
      <View style={styles.row}>
        <AppButton title="Entrada" variant={type === 'entrada' ? 'primary' : 'ghost'} onPress={() => onTypeChange('entrada')} style={styles.option} />
        <AppButton title="Salida" variant={type === 'salida' ? 'primary' : 'ghost'} onPress={() => onTypeChange('salida')} style={styles.option} />
      </View>
      <AppInput icon="id-card" value={value} onChangeText={onChange} placeholder="UID o matrícula" />
      <AppButton title="Registrar" loading={loading} onPress={onRegister} />
      <AttendanceResultCard result={result} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  row: { flexDirection: 'row', gap: 10 },
  option: { flex: 1 },
});
