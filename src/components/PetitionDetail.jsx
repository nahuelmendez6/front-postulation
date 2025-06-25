import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPetitionById } from "../api/petitionApi";
import { getPostulationsByPetition } from "../api/postulationApi";
import PostulationForm from "./PostulationForm";

const PetitionDetail = () => {
  const { id } = useParams();
  const [petition, setPetition] = useState(null);
  const [postulations, setPostulations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPetitionById(id)
      .then((res) => setPetition(res.data))
      .catch((err) => console.error(err));

    getPostulationsByPetition(id)
      .then((res) => setPostulations(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!petition) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div className="container-fluid px-4 py-4 w-100">
      <h2 className="mb-4 text-primary">
        <i className="bi bi-info-circle-fill me-2"></i>Detalle de Petición
      </h2>

      <div className="card shadow border-0 rounded-4 mb-5 w-100">
        <div className="card-body p-4 bg-light">
          {/* Descripción */}
          <section className="mb-4 border-bottom pb-3">
            <h4 className="text-dark fw-semibold mb-2">
              <i className="bi bi-card-text me-2 text-primary"></i>Descripción
            </h4>
            <p className="text-muted mb-0">{petition.description || "Sin descripción disponible."}</p>
          </section>

          {/* Fechas y cliente */}
          <section className="row text-dark mb-4">
            <div className="col-md-4 mb-3">
              <div className="small text-muted mb-1">📅 Fecha de inicio</div>
              <div className="fw-semibold">
                <i className="bi bi-calendar3 me-1 text-success"></i>
                {new Date(petition.dateSince).toLocaleDateString()}
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="small text-muted mb-1">✅ Fecha de fin</div>
              <div className="fw-semibold">
                <i className="bi bi-calendar-check me-1 text-danger"></i>
                {new Date(petition.dateUntil).toLocaleDateString()}
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="small text-muted mb-1">👤 Cliente</div>
              <div className="fw-semibold">
                <i className="bi bi-person-circle me-1 text-info"></i>
                {petition.id_customer}
              </div>
            </div>
          </section>

          {/* Acción */}
          <section className="text-end">
            <button className="btn btn-primary px-4 py-2" onClick={() => setShowModal(true)}>
              📩 Postularse
            </button>
          </section>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold text-primary">
                  <i className="bi bi-pencil-square me-2"></i>Formulario de Postulación
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <PostulationForm petitionId={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetitionDetail;
