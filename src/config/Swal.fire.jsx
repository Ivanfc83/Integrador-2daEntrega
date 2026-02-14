import Swal from "sweetalert2";


function ShowSwalToast(titulo, descripcion, iconito = "success") {
  Swal.fire({
    title: titulo,
    text: descripcion,
    icon: iconito,
    position: "top-right",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    customClass: {
      container: 'swal-container-custom',
    },
    didOpen: (toast) => {
      toast.style.zIndex = '9999';
    }
  });
}

export default ShowSwalToast;

