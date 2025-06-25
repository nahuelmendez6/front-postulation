import { useEffect, useState } from "react";
import { getMyPostulations, updateWinner, updateIdState } from "../api/postulationApi";

/**
 * Componente que muestra las postulaciones realizadas por el usuario actual.
 * Permite aceptar o rechazar cada postulación mediante botones de acción.
 */
const MyPostulations = () => {
  // Estado local para almacenar las postulaciones del usuario
  const [postulations, setPostulations] = useState([]);

  // Al montar el componente, se obtienen las postulaciones del usuario
  useEffect(() => {
    getMyPostulations()
      .then((res) => setPostulations(res.data)) // Se actualiza el estado con los datos recibidos
      .catch((err) => console.error(err)); // Se maneja cualquier error en la consola
  }, []);

  /**
   * Maneja la aceptación de una postulación.
   * Llama a la API para marcarla como ganadora.
   * @param {number|string} postId - ID de la postulación.
   */
  const handleAccept = (postId) => {
    updateWinner(postId, "true")
      .then(() => alert("Postulación aceptada"))
      .catch(() => alert("Error al aceptar"));
  };

   /**
   * Maneja el rechazo de una postulación.
   * Cambia el estado de la postulación a "rechazada" (ID 2, según el backend).
   * @param {number|string} postId - ID de la postulación.
   */
  const handleReject = (postId) => {
    updateIdState(postId, 2) // 2 = rechazado
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