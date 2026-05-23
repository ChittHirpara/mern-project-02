import axios from "axios";

// In Vite, environment variables must start with VITE_
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export const getAllNotes = () => api.get("/api/notes").then((r) => r.data);

export const createNote = (data) =>
  api.post("/api/notes", data).then((r) => r.data);

export const updateNote = (id, data) =>
  api.put(`/api/notes/${id}`, data).then((r) => r.data);

export const deleteNote = (id) =>
  api.delete(`/api/notes/${id}`).then((r) => r.data);
