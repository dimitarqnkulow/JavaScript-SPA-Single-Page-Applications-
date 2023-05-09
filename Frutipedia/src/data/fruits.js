import { del, get, post, put } from "./api.js";

export async function getAllFruits() {
  return await get("/data/fruits?sortBy=_createdOn%20desc");
}

export async function getFruitById(id) {
  return await get(`/data/fruits/${id}`);
}

export async function addFruit(data) {
  return await post("/data/fruits", data);
}

export async function updateFruit(id, data) {
  return await put(`/data/fruits/${id}`, data);
}

export async function deleteFruit(id) {
  return await del(`/data/fruits/${id}`);
}
