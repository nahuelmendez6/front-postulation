import { useState } from "react";
import { createPostulation } from "../api/postulationApi";

const PostulationForm = ({ petitionId }) => {
  const [form, setForm] = useState({ petitionId, name: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostulation(form)
      .then(() => setSuccess(true))
      .catch((err) => alert("Error al postularse"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Tu nombre"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="message"
        placeholder="Mensaje"
        value={form.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Postularse</button>
      {success && <p>¡Postulación enviada!</p>}
    </form>
  );
};

export default PostulationForm;