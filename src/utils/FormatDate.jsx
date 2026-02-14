export function FormartISODateToLocal(isoDate) {
  // 1. Validar que exista un valor.
  if(!isoDate) return 'Fecha no disponible';

  const date = new Date(isoDate);

  // 2. Validar que la fecha sea válida, que no sea "Invalid Date".
  if(isNaN(date.getTime())) return 'Fecha inválida';

  const formatter = new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return formatter.format(date);
}
