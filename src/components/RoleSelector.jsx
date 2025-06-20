import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Selecciona tu rol</h2>
      <button onClick={() => navigate("/petitions")}>Solicitante</button>
      <button onClick={() => navigate("/petitions")}>Postulante</button>
      <br />
      <button onClick={() => navigate("/my-postulations")}>Ver mis postulaciones (Postulante)</button>
    </div>
  );
};

export default RoleSelector;