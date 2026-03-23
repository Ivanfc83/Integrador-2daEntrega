// Array con los items del menú de navegación
// Cada objeto tiene el texto que se muestra y la ruta a donde va
// adminOnly: true hace que ese link solo aparezca si el usuario es administrador
const NAV_ITEMS = [
  { text: "Home",        path: "/" },
  { text: "Products",    path: "/products" },
  { text: "About Us",    path: "/about" },
  { text: "Register",    path: "/register" },
  { text: "Contact",     path: "/contact" },

  // Estas dos rutas solo las ve el admin
  { text: "Admin Prods", path: "/admin/products", adminOnly: true },
  { text: "Admin Users", path: "/admin/users",    adminOnly: true },
];

export default NAV_ITEMS;
