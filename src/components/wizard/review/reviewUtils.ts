
export const formatMode = (mode: 'air' | 'sea' | 'land') => {
  if (!mode) return 'N/A';
  return mode.charAt(0).toUpperCase() + mode.slice(1);
}

export const formatBoolean = (value: boolean | null) => {
  if (value === null) return 'Not answered';
  return value ? 'Yes' : 'No';
}
