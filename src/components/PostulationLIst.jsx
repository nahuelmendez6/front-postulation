import { useEffect, useState } from "react";
import { getPostulationByProviderId } from "../api/postulationApi";
import { useNavigate } from "react-router-dom";

/**
 * Componente que muestra la lista de postulaciones asociadas a un proveedor específico.
 * El proveedor está hardcodeado con id 179 para fines de prueba.
 */
const PostulationList = () => {
  // ID del proveedor hardcodeado (debería venir de autenticación en un caso real)
  const idProvider = 179; 

  // Estado local para almacenar las postulaciones obtenidas
  const [postulations, setPostulations] = useState([]);

   // Hook para navegación entre páginas
  const navigate = useNavigate();

  // Efecto para cargar las postulaciones del proveedor al montar el componente
  useEffect(() => {
    getPostulationByProviderId(idProvider)
      .then((res) => setPostulations(res.data))
      .catch((err) => console.error(err));
  }, []);

  /**
   * Retorna la clase CSS adecuada para el badge según el estado de la postulación.
   * @param {string} state - Estado de la postulación (aceptada, rechazada, pendiente, etc.)
   * @returns {string} Clase CSS para badge
   */
  const getBadgeClass = (state) => {
    switch (state?.toLowerCase()) {
      case "aceptada":
        return "badge bg-success";
      case "rechazada":
        return "badge bg-danger";
      case "pendiente":
        return "badge bg-warning text-dark";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Mis postulaciones</h2>

      {postulations.length === 0 ? (
        <p className="text-muted">No hay postulaciones disponibles.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {postulations.map((postulation) => (
            <div key={postulation.idPostulation} className="col">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">
                  {/* Propuesta */}
                  <h5 className="card-title text-dark mb-3 border-bottom pb-2">
                    <i className="bi bi-file-text me-2 text-primary"></i>
                    {postulation.proposal || `Postulación #${postulation.idPostulation}`}
                  </h5>

                  {/* Costo */}
                  <div className="mb-3">
                    <p className="text-muted small mb-0">
                      <strong className="text-dark d-block mb-1">Costo:</strong>
                      {postulation.cost != null ? `$${postulation.cost}` : "No especificado"}
                    </p>
                  </div>

                  {/* Estado */}
                  <div className="mb-3 border-top pt-2">
                    <strong>Estado:</strong>{" "}
                    <span className={getBadgeClass(postulation.state)}>
                      {postulation.state || "Desconocido"}
                    </span>
                  </div>

                  {/* Ganadora */}
                  <div className="mb-3 border-top pt-2">
                    <p className="mb-0">
                      <i className="bi bi-award me-1 text-info"></i>
                      <strong>Ganadora:</strong> {postulation.winner === "Y" ? "Sí" : "No"}
                    </p>
                  </div>

                  {/* Fecha de creación */}
                  <div className="mb-3 border-top pt-2">
                    <p className="mb-0">
                      <i className="bi bi-clock-history me-1 text-secondary"></i>
                      <strong>Creada:</strong>{" "}
                      {postulation.dateCreate
                        ? new Date(postulation.dateCreate).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>

                  {/* Botón */}
                  <div className="text-end">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => navigate(`/postulations/${postulation.idPostulation}`)}
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostulationList;
