import { useEffect, useState } from "react";
import { getAllPetitions } from "../api/petitionApi";
import { useNavigate } from "react-router-dom";

/**
 * Componente que muestra una lista de todas las peticiones disponibles.
 * Cada tarjeta incluye información resumida de la petición y un botón para ver su detalle.
 */
const PetitionList = () => {
  const [petitions, setPetitions] = useState([]); // Estado que almacena las peticiones
  const navigate = useNavigate(); // Hook de React Router para redirigir

  // Al montar el componente, se obtienen todas las peticiones desde la API
  useEffect(() => {
    getAllPetitions()
      .then((res) => {
        console.log("🟢 Petitions:", res.data);  // Log para depuración
        setPetitions(res.data); // Actualiza el estado con la respuesta
      })
      .catch((err) => console.error(err));  // Manejo de errores
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Lista de Peticiones</h2>
      {petitions.length === 0 ? (
        <p className="text-muted">No hay peticiones disponibles.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {petitions.map((petition) => (
            <div key={petition.idPetition} className="col">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">
                  {/* Nombre */}
                  <h5 className="card-title text-dark mb-3 border-bottom pb-2">
                    <i className="bi bi-file-earmark-text me-2 text-primary"></i>
                    {petition.title || `Petición #${petition.idPetition}`}
                  </h5>

                  {/* Descripción */}
                  <div className="mb-3">
                    <p className="text-muted small mb-0">
                      <strong className="text-dark d-block mb-1">Descripción:</strong>
                      {petition.description?.substring(0, 100) || "Sin descripción"}...
                    </p>
                  </div>

                  {/* Fechas */}
                  <div className="mb-3 border-top pt-2">
                    <p className="mb-1">
                      <i className="bi bi-calendar3 text-success me-1"></i>
                      <strong>Desde:</strong>{" "}
                      {new Date(petition.dateSince).toLocaleDateString()}
                    </p>
                    <p className="mb-1">
                      <i className="bi bi-calendar-check text-danger me-1"></i>
                      <strong>Hasta:</strong>{" "}
                      {new Date(petition.dateUntil).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Cliente */}
                  <div className="mb-3 border-top pt-2">
                    <p className="mb-0">
                      <i className="bi bi-person-circle text-info me-1"></i>
                      <strong>Cliente:</strong> {petition.id_customer} Cliente ejemplo
                    </p>
                  </div>

                  {/* Estado */}
                  {petition.state && (
                    <div className="mb-3 border-top pt-2">
                      <span className="badge bg-secondary">{petition.state}</span>
                    </div>
                  )}

                  {/* Botón */}
                  <div className="text-end">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => navigate(`/petitions/${petition.idPetition}`)}
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

export default PetitionList;
