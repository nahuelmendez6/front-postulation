import axios from "axios";

// URL base del endpoint para las peticiones
const API_URL = "http://localhost:8080/api/petitions";

/**
 * Obtiene todas las peticiones desde el backend.
 * @returns {Promise} Promesa con la respuesta de la API que contiene todas las peticiones.
 */
export const getAllPetitions = () => axios.get(API_URL);
/**
 * Obtiene una petición específica por su ID.
 * @param {number|string} id - El ID de la petición a obtener.
 * @returns {Promise} Promesa con la respuesta de la API que contiene los datos de la petición.
 */
export const getPetitionById = (id) => axios.get(`${API_URL}/${id}`);

