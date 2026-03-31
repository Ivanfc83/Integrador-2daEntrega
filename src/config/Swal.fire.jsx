import Swal from "sweetalert2";

// Función reutilizable para mostrar notificaciones tipo "toast"
// Las uso en toda la app para avisar éxito, error o información
// Por defecto muestra ícono de éxito si no se pasa el tercer parámetro
function ShowSwalToast(titulo, descripcion, iconito = "success") {
  Swal.fire({
    title: titulo,
    text: descripcion,
    icon: iconito,
    position: "top-right",
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,

    // Tema oscuro para que combine con el diseño de la app
    background: "#1a1a1a",
    color: "#ffffff",

    customClass: {
      container: "swal-container-custom",
      popup: "swal-toast-dark",
      title: "swal-title-dark",
    },
    didOpen: (toast) => {
      // Me aseguro que aparezca por encima de todo lo demás
      toast.style.zIndex = "9999";
    },
  });
}

export default ShowSwalToast;
