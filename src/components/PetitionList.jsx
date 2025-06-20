import { useEffect, useState } from "react";
import { getAllPetitions } from "../api/petitionApi";
import { useNavigate } from "react-router-dom";

const PetitionList = () => {
  const [petitions, setPetitions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPetitions()
      .then((res) => setPetitions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de Peticiones</h2>
      <ul>
        {petitions.map((petition) => (
          <li key={petition.id}>
            {petition.title || `Petición #${petition.id}`}
            <button onClick={() => navigate(`/petitions/${petition.id}`)}>
              Ver Detalle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetitionList;