import { useState } from "react";
import { createPostulation } from "../api/postulationApi";

const PostulationForm = ({ petitionId }) => {
  // providerId esta hardcodeado para no necesitar un login
  const [form, setForm] = useState({ idPetition:petitionId, providerId: 179, name: "", proposal: "", cost: "", id_state: 3 });
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     idPetition: form.idPetition,
  //     idProvider: form.providerId, 
  //     proposal: form.proposal,
  //     cost: Number(form.cost),
  //     id_state: form.id_state,
      
  //   };
  //   createPostulation(payload)
  //     .then(() => setSuccess(true))
  //     .catch((err) => alert("Error al postularse"));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const payload = {
      petition: { idPetition: form.idPetition },  // objeto petition con idPetition
      idProvider: form.providerId,
      proposal: form.proposal,
      cost: Number(form.cost),
      idState: form.id_state,  // camelCase, no id_state
      // Si el backend requiere otros campos, agregalos aquí
    };
  
    createPostulation(payload)
      .then(() => setSuccess(true))
      .catch((err) => alert("Error al postularse"));
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
    <div className="mb-3">
      <input className="form-control" name="name" placeholder="Tu nombre" value={form.name} onChange={handleChange} required />
    </div>
    <div className="mb-3">
      <input className="form-control" name="proposal" placeholder="Propuesta" value={form.proposal} onChange={handleChange} required />
    </div>
    <div className="mb-3">
      <input
        className="form-control"
        name="cost"
        placeholder="Costo"
        type="number"
        value={form.cost}
        onChange={handleChange}
        required
        min="0.01"
        step="0.01"
      />
    </div>
    <button className="btn btn-primary" type="submit">Postularse</button>
    {success && <div className="alert alert-success mt-3">¡Postulación enviada!</div>}
  </form>
  );
};


export default PostulationForm;
