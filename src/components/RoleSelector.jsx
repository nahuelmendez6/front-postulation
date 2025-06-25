import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
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
