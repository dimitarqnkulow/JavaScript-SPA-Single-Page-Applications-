import { get } from "./api.js";

export async function searchFruit(query) {
  return await get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}
