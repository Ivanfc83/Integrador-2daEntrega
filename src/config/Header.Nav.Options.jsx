// Array con los items del menú de navegación
// adminOnly: true hace que ese link solo aparezca si el usuario es administrador
// dropdown: [] agrupa sub-links bajo un mismo ítem con hover/click
const NAV_ITEMS = [
  { text: "Home",      path: "/" },
  { text: "Products",  path: "/products" },
  { text: "About Us",  path: "/about" },
  { text: "Register",  path: "/register" },
  { text: "Contact",   path: "/contact" },

  // "Admin" agrupa las dos páginas de administración en un solo dropdown
  {
    text: "Admin",
    adminOnly: true,
    dropdown: [
      { text: "Productos", path: "/admin/products" },
      { text: "Usuarios",  path: "/admin/users" },
    ],
  },
];

export default NAV_ITEMS;
