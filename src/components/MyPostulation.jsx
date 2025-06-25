import { useEffect, useState } from "react";
import { getMyPostulations, updateWinner, updateIdState } from "../api/postulationApi";

const MyPostulations = () => {
  const [postulations, setPostulations] = useState([]);

  useEffect(() => {
    getMyPostulations()
      .then((res) => setPostulations(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAccept = (postId) => {
    updateWinner(postId, "true")
      .then(() => alert("Postulación aceptada"))
      .catch(() => alert("Error al aceptar"));
  };

  const handleReject = (postId) => {
    updateIdState(postId, 2) // 2 = rechazado, ajusta según tu backend
      .then(() => alert("Postulación rechazada"))
      .catch(() => alert("Error al rechazar"));
  };

  return (
    <div>
      <h2 className="mb-4">Mis Postulaciones</h2>
      <ul className="list-group">
        {postulations.map((post) => (
          <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>{JSON.stringify(post)}</div>
            <div className="btn-group">
              <button className="btn btn-sm btn-success" onClick={() => handleAccept(post.id)}>Aceptar</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleReject(post.id)}>Rechazar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPostulations;