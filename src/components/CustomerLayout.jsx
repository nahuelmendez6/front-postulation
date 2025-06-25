import { Outlet, Link, useLocation } from "react-router-dom";

/**
 * Layout del dashboard del cliente.
 * Este componente define la estructura general de la interfaz para un cliente,
 * incluyendo una barra lateral (sidebar) con navegación y un área principal de contenido.
 */
const DashboardCustomerLayout = () => {
  // Hook de React Router para obtener la ruta actual
  const { pathname } = useLocation();


  /**
   * Verifica si una ruta dada coincide con el comienzo del pathname actual.
   * Esto se utiliza para aplicar estilos de "activo" a los enlaces.
   * @param {string} path - Ruta a comparar.
   * @returns {boolean} true si el pathname actual comienza con la ruta dada.
   */
  const isActive = (path) => pathname.startsWith(path);
   // Colores personalizados
  const linkedinBlue = "#0077B5";
  const navbarSilver = "#dcdcdc";

  return (
    <div className="d-flex w-100 vh-100">
      {/* Sidebar */}
      <div
        className="bg-primary text-white p-3"
        style={{ flex: "0 0 250px", minWidth: "250px", maxWidth: "250px", backgroundColor: linkedinBlue }}
      >
        <h4 className="mb-4">
          <i className="bi bi-grid-fill me-2"></i> Integración comunitaria
        </h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link
              to="/customer/petitions"
              className={`nav-link ${
                isActive("/customer/petitions") ? "fw-semibold text-white bg-opacity-25 bg-white rounded px-2" : "text-white-50"
              }`}
            >
              <i className="bi bi-list-task me-2"></i> Mis Peticiones
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/postulation-list"
              className={`nav-link ${
                isActive("/postulation-list") ? "fw-semibold text-white bg-opacity-25 bg-white rounded px-2" : "text-white-50"
              }`}
            >
              <i className="bi bi-file-earmark-check me-2"></i> Mis Postulaciones
            </Link>
          </li>
        </ul>
      </div>


      {/* Contenido principal */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Navbar */}
        <nav className="navbar border-bottom px-4" style={{ backgroundColor: navbarSilver }}>
          <div className="container-fluid d-flex justify-content-between">
            <span className="navbar-text fw-semibold text-dark">Bienvenido/a</span>
            <Link
              to="/"
              className="btn btn-sm btn-outline-light"
              style={{ backgroundColor: linkedinBlue, color: "white" }}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
            </Link>
          </div>
        </nav>

        {/* Esto debe ocupar TODO el ancho disponible */}
        <main className="flex-grow-1 p-4 overflow-auto bg-light w-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardCustomerLayout;
