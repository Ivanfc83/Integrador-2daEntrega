import Swal from "sweetalert2";

// Función reutilizable para mostrar notificaciones tipo "toast"
// Las uso en toda la app para avisar éxito, error o información
// Por defecto muestra ícono de éxito si no se pasa el tercer parámetro
function ShowSwalToast(titulo, descripcion, iconito = "success") {
  Swal.fire({
    title: titulo,
    text: descripcion,
    icon: iconito,
    position: "top-right",  // Aparece en la esquina superior derecha
    timer: 2000,             // Se cierra solo a los 2 segundos
    showConfirmButton: false, // No muestra botón de confirmación
    toast: true,             // Modo compacto (toast)
    customClass: {
      container: "swal-container-custom",
    },
    didOpen: (toast) => {
      // Me aseguro que aparezca por encima de todo lo demás
      toast.style.zIndex = "9999";
    },
  });
}

export default ShowSwalToast;
