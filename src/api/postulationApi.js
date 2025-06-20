import axios from "axios";

const API_URL = "http://localhost:8080/api/postulations"; // Cambia el puerto si tu backend usa otro

export const getPostulationsByPetition = (idPetition) =>
  axios.get(`${API_URL}/by-petition/${idPetition}`);

export const getPostulationById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createPostulation = (postulation) =>
  axios.post(API_URL, postulation);

export const getMyPostulations = () =>
  axios.get(`${API_URL}`); // Ajusta si tienes endpoint para "mis" postulaciones

export const updateWinner = (id, winner) =>
  axios.patch(`${API_URL}/${id}/winner`, winner, {
    headers: { "Content-Type": "application/json" },
  });

export const updateIdState = (id, idState) =>
  axios.patch(`${API_URL}/${id}/state`, idState, {
    headers: { "Content-Type": "application/json" },
  });