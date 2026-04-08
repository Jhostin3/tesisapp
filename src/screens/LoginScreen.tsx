import React, { useState } from 'react';
import AuthTemplate from '../components/templates/AuthTemplate';
import LoginForm from '../components/organisms/LoginForm';
import { authService } from '../services/authService';
import type { Session } from '../types/models';

type Props = { onLogin: (session: Session) => void };

export default function LoginScreen({ onLogin }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError('');
      const session = await authService.login({ email, password });
      onLogin(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthTemplate title="Edunova Guardia" subtitle="Acceso institucional para control de ingreso">
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </AuthTemplate>
  );
}
