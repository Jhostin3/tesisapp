export const nowTime = (): string => {
  return new Date().toLocaleTimeString('es-EC', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const greetingByHour = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
};
