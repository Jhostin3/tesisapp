import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AppInput from '../atoms/AppInput';
import AppButton from '../atoms/AppButton';
import AppText from '../atoms/AppText';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';

type Props = {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  error: string;
};

export default function LoginForm({ onSubmit, loading, error }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.form}>
      <View style={styles.heading}>
        <AppText variant="subtitle" style={styles.center}>Acceso institucional</AppText>
        <AppText variant="caption" style={styles.center}>Sistema inteligente de asistencia escolar</AppText>
      </View>
      <AppInput icon="mail" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Correo institucional" />
      <AppInput icon="lock-closed" value={password} onChangeText={setPassword} secureTextEntry placeholder="Contraseña" />
      <Pressable style={styles.forgot}>
        <AppText variant="caption" style={styles.link}>¿Olvidaste tu contraseña?</AppText>
      </Pressable>
      {error ? <AppText style={styles.error}>{error}</AppText> : null}
      <AppButton title="Iniciar sesión" loading={loading} onPress={() => onSubmit(email, password)} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.sm },
  heading: { gap: 4, marginBottom: spacing.xs },
  center: { textAlign: 'center' },
  forgot: { alignSelf: 'flex-end', paddingVertical: spacing.xs },
  link: { color: colors.primary, fontWeight: '600' },
  button: { marginTop: spacing.xs },
  error: { color: colors.error, fontSize: 13 },
});
