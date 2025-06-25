import { useEffect, useState } from "react";
import { getAllPetitions } from "../api/petitionApi";
import { getPostulationsByPetition, updateIdState, updateWinner } from "../api/postulationApi";
import { useNavigate } from "react-router-dom";

const PetitionListWithPostulations = () => {
  const [petitions, setPetitions] = useState([]);
  const [postulationsMap, setPostulationsMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPetitionId, setSelectedPetitionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPetitions()
      .then((res) => {
        const fetchedPetitions = res.data;
        setPetitions(fetchedPetitions);

        fetchedPetitions.forEach((petition) => {
          getPostulationsByPetition(petition.idPetition)
            .then((res) => {
              setPostulationsMap((prev) => ({
                ...prev,
                [petition.idPetition]: res.data,
              }));
            })
            .catch((err) =>
              console.error(`Error al obtener postulaciones de petición ${petition.idPetition}`, err)
            );
        });
      })
      .catch((err) => console.error("Error al obtener peticiones:", err));
  }, []);

  const handleDecision = async (idPostulation, accept = true) => {
    try {
      const newState = accept ? 1 : 2; // 1 = aceptada, 2 = rechazada
      const newWinner = accept ? "Y" : "N";

      await updateIdState(idPostulation, newState);
      await updateWinner(idPostulation, newWinner);

      // Actualizamos el estado local
      setPostulationsMap((prevMap) => {
        const updatedList = prevMap[selectedPetitionId].map((p) =>
          p.idPostulation === idPostulation
            ? { ...p, idState: newState, state: newState, winner: newWinner }
            : p
        );
        return {
          ...prevMap,
          [selectedPetitionId]: updatedList,
        };
      });
    } catch (err) {
      console.error("Error al actualizar postulación:", err);
      alert("Error al procesar la decisión.");
    }
  };

  const openModal = (idPetition) => {
    setSelectedPetitionId(idPetition);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPetitionId(null);
  };

  // Función para mapear estados a badges con color
  const renderStateBadge = (state) => {
    switch (state) {
      case 1:
      case "1":
        return <span className="badge bg-success">Aceptada</span>;
      case 2:
      case "2":
        return <span className="badge bg-danger">Rechazada</span>;
      case 0:
      case "0":
        return <span className="badge bg-warning text-dark">Pendiente</span>;
      default:
        return <span className="badge bg-secondary">Desconocido</span>;
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Peticiones y Postulaciones</h2>

      {petitions.length === 0 ? (
        <p className="text-muted">No hay peticiones disponibles.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {petitions.map((petition) => (
            <div key={petition.idPetition} className="col">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body d-flex flex-column">
                  {/* Título */}
                  <h5 className="card-title text-dark fw-bold border-bottom pb-2 mb-3">
                    {petition.title || `Petición #${petition.idPetition}`}
                  </h5>

                  {/* Descripción */}
                  <p className="card-text text-muted small mb-3 flex-grow-1">
                    {petition.description?.substring(0, 100) || "Sin descripción"}...
                  </p>

                  {/* Fechas y cliente */}
                  <div className="mb-3">
                    <div>
                      <i className="bi bi-calendar3 text-success me-1"></i>
                      <strong>Desde:</strong> {new Date(petition.date_since).toLocaleDateString()}
                    </div>
                    <div>
                      <i className="bi bi-calendar-check text-danger me-1"></i>
                      <strong>Hasta:</strong> {new Date(petition.date_until).toLocaleDateString()}
                    </div>
                    <div>
                      <i className="bi bi-person-circle text-info me-1"></i>
                      <strong>Cliente:</strong> {petition.id_customer}
                    </div>
                  </div>

                  {/* Estado */}
                  {petition.state && (
                    <div className="mb-3">
                      <strong>Estado: </strong>
                      <span className="badge bg-secondary">{petition.state}</span>
                    </div>
                  )}

                  {/* Botones */}
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-outline-info btn-sm flex-grow-1"
                      onClick={() => openModal(petition.idPetition)}
                    >
                      Ver postulaciones
                    </button>
                    <button
                      className="btn btn-primary btn-sm flex-grow-1"
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

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header">
                <h5 className="modal-title">
                  Postulaciones de Petición #{selectedPetitionId}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Cerrar"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {postulationsMap[selectedPetitionId]?.length > 0 ? (
                  <div className="list-group">
                    {postulationsMap[selectedPetitionId].map((postulation) => (
                      <div
                        key={postulation.idPostulation}
                        className="list-group-item rounded-3 mb-3 shadow-sm border"
                      >
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong className="text-primary fs-5">
                            Proveedor: {postulation.id_provider}
                          </strong>
                          <div>{renderStateBadge(postulation.state || postulation.idState)}</div>
                        </div>

                        <p className="mb-1">
                          <strong>Propuesta:</strong> {postulation.proposal}
                        </p>
                        <p className="mb-1">
                          <strong>Costo:</strong> ${postulation.cost ?? "No especificado"}
                        </p>
                        <p className="mb-1">
                          <strong>Ganador:</strong>{" "}
                          {postulation.winner === "Y" ? (
                            <span className="text-success fw-semibold">Sí</span>
                          ) : (
                            <span className="text-muted">No</span>
                          )}
                        </p>

                        <div className="mt-3 d-flex gap-2">
                          <button
                            className="btn btn-success btn-sm flex-grow-1"
                            onClick={() => handleDecision(postulation.idPostulation, true)}
                          >
                            Aceptar
                          </button>
                          <button
                            className="btn btn-danger btn-sm flex-grow-1"
                            onClick={() => handleDecision(postulation.idPostulation, false)}
                          >
                            Rechazar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No hay postulaciones para esta petición.</p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetitionListWithPostulations;
