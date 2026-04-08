import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AppInput from '../atoms/AppInput';
import AppButton from '../atoms/AppButton';
import AppText from '../atoms/AppText';
import { colors } from '../../constants/colors';

type Props = {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  error: string;
};

export default function LoginForm({ onSubmit, loading, error }: Props) {
  const [email, setEmail] = useState('guardia@edunova.edu.ec');
  const [password, setPassword] = useState('123456');

  return (
    <View style={styles.form}>
      <AppInput value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Correo institucional" />
      <AppInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Contraseña" />
      {error ? <AppText style={styles.error}>{error}</AppText> : null}
      <AppButton title="Iniciar sesión" loading={loading} onPress={() => onSubmit(email, password)} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12 },
  error: { color: colors.error, fontSize: 13 },
});
