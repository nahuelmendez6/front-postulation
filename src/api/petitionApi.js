import axios from "axios";

const API_URL = "http://localhost:8080/api/petitions"; // Cambia el puerto si tu backend usa otro

export const getAllPetitions = () => axios.get(API_URL);

export const getPetitionById = (id) => axios.get(`${API_URL}/${id}`);

// Puedes agregar más funciones según lo que exponga tu backend