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
      <h2>Mis Postulaciones</h2>
      <ul>
        {postulations.map((post) => (
          <li key={post.id}>
            {JSON.stringify(post)}
            <button onClick={() => handleAccept(post.id)}>Aceptar</button>
            <button onClick={() => handleReject(post.id)}>Rechazar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPostulations;