import axios from "axios";

// URL base del endpoint para las postulaciones
const API_URL = "http://localhost:8080/api/postulations"; // Cambia el puerto si tu backend usa otro

/**
 * Obtiene todas las postulaciones asociadas a una petición específica.
 * @param {number|string} idPetition - ID de la petición.
 * @returns {Promise} Promesa con la respuesta de la API que contiene las postulaciones.
 */
export const getPostulationsByPetition = (idPetition) =>
  axios.get(`${API_URL}/by-petition/${idPetition}`);

/**
 * Obtiene una postulación por su ID.
 * @param {number|string} id - ID de la postulación.
 * @returns {Promise} Promesa con la respuesta de la API.
 */
export const getPostulationById = (id) =>
  axios.get(`${API_URL}/${id}`);

/**
 * Obtiene todas las postulaciones realizadas por un proveedor específico.
 * @param {number|string} idProvider - ID del proveedor.
 * @returns {Promise} Promesa con la respuesta de la API.
 */
export const getPostulationByProviderId = (idProvider) =>
  axios.get(`${API_URL}/by-provider/${idProvider}`);

/**
 * Crea una nueva postulación.
 * @param {Object} postulation - Objeto con los datos de la postulación a crear.
 * @returns {Promise} Promesa con la respuesta de la API.
 */
export const createPostulation = (postulation) =>
  axios.post(API_URL, postulation);

/**
 * Obtiene las postulaciones del usuario autenticado (ajusta si el backend tiene un endpoint específico para esto).
 * @returns {Promise} Promesa con la respuesta de la API.
 */
export const getMyPostulations = () =>
  axios.get(`${API_URL}`); // Ajusta si tienes endpoint para "mis" postulaciones

/**
 * Actualiza el campo de "ganador" de una postulación.
 * @param {number|string} id - ID de la postulación.
 * @param {Object} winner - Objeto con la información del ganador (por ejemplo, { winner: true }).
 * @returns {Promise} Promesa con la respuesta de la API.
 */
export const updateWinner = (id, winner) =>
  axios.patch(`${API_URL}/${id}/winner`, winner, {
    headers: { "Content-Type": "application/json" },
  });

  /**
 * Actualiza el estado de una postulación.
 * @param {number|string} id - ID de la postulación.
 * @param {Object} idState - Objeto con el nuevo estado (por ejemplo, { idState: 2 }).
 * @returns {Promise} Promesa con la respuesta de la API.
 */
export const updateIdState = (id, idState) =>
  axios.patch(`${API_URL}/${id}/state`, idState, {
    headers: { "Content-Type": "application/json" },
  });