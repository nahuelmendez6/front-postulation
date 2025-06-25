import { useNavigate } from "react-router-dom";

/**
 * Componente que muestra una pantalla simple para seleccionar el rol de usuario
 * e ingresar a la aplicación con diferentes vistas según el rol seleccionado.
 *
 * - Cliente: redirige a la ruta "customer/petitions"
 * - Proveedor: redirige a la ruta "/petitions"
 * - Postulante: redirige a la ruta "/my-postulations"
 */
const RoleSelector = () => {
  // Hook para navegación programática entre rutas
  const navigate = useNavigate();

  return (
    <div className="text-center bg-white p-5 rounded shadow-sm">
      <h1>Integración comunitaria</h1>
      <h2 className="mb-4">Ingresar</h2>
      <div className="d-grid gap-3">
        <button className="btn btn-primary" onClick={() => navigate("customer/petitions")}>Ingresar como cliente</button>
        <button className="btn btn-success" onClick={() => navigate("/petitions")}>Ingresar como proveedor</button>
        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate("/my-postulations")}>
          Ver mis postulaciones (Postulante)
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
