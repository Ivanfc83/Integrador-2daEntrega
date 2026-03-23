// Convierte una fecha en formato ISO (la que devuelve el backend)
// a un formato legible en español argentino: dd/mm/aaaa
// Ejemplo: "2024-03-15T00:00:00.000Z" → "15/03/2024"
export function FormartISODateToLocal(isoDate) {

  // Si no hay fecha, devuelvo un texto de reemplazo
  if (!isoDate) return "Fecha no disponible";

  const date = new Date(isoDate);

  // Verifico que la fecha sea válida antes de formatearla
  // getTime() devuelve NaN si la fecha no pudo convertirse
  if (isNaN(date.getTime())) return "Fecha inválida";

  // Uso Intl.DateTimeFormat para formatear con el estándar de Argentina
  const formatter = new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formatter.format(date);
}
