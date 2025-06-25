import { useState } from "react";
import { createPostulation } from "../api/postulationApi";

/**
 * Componente de formulario para crear una postulación a una petición específica.
 * Permite ingresar propuesta, costo y otros datos básicos del proveedor.
 *
 * @param {number} petitionId - ID de la petición a la que se postula
 */
const PostulationForm = ({ petitionId }) => {
  // Estado local del formulario, con providerId hardcodeado para pruebas sin login
  const [form, setForm] = useState({ idPetition:petitionId, providerId: 179, name: "", proposal: "", cost: "", id_state: 3 });
  
  // Estado para mostrar mensaje de éxito
  const [success, setSuccess] = useState(false);
  
   /**
   * Maneja el cambio de los inputs del formulario
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  /**
   * Envía el formulario al backend utilizando la API `createPostulation`.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
     // Se construye el payload que espera el backend
    const payload = {
      petition: { idPetition: form.idPetition },  // relación a la petición
      idProvider: form.providerId,  // ID del proveedor (simulado)
      proposal: form.proposal,  // propuesta textual
      cost: Number(form.cost),  // costo como número
      idState: form.id_state,   // estado inicial
      
    };
    
    // Llamada al backend para crear la postulación
    createPostulation(payload)
      .then(() => setSuccess(true)) // Muestra mensaje de éxito
      .catch((err) => alert("Error al postularse"));   // Muestra alerta en caso de error
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
