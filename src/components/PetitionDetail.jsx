import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPetitionById } from "../api/petitionApi";
import { getPostulationsByPetition } from "../api/postulationApi";
import PostulationForm from "./PostulationForm";

const PetitionDetail = () => {
  const { id } = useParams();
  const [petition, setPetition] = useState(null);
  const [postulations, setPostulations] = useState([]);

  useEffect(() => {
    getPetitionById(id)
      .then((res) => setPetition(res.data))
      .catch((err) => console.error(err));

    getPostulationsByPetition(id)
      .then((res) => setPostulations(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!petition) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalle de Petición</h2>
      <pre>{JSON.stringify(petition, null, 2)}</pre>
      <h3>Postulaciones</h3>
      <ul>
        {postulations.map((post) => (
          <li key={post.id}>{JSON.stringify(post)}</li>
        ))}
      </ul>
      <h3>Postularse</h3>
      <PostulationForm petitionId={id} />
    </div>
  );
};

export default PetitionDetail;