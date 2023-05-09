import { del, get, post, put } from "./api.js";

const endpoints = {
  sorted: "/data/books?sortBy=_createdOn%20desc",
  catalog: "/data/books",
  byId: "/data/books/",
};

export async function getAllBooks() {
  return await get(endpoints.sorted);
}

export async function getMyBooks(id) {
  return await get(
    `/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`
  );
}

export async function getBookById(id) {
  return await get(endpoints.byId + id);
}

export async function addBook(data) {
  return await post(endpoints.catalog, data);
}

export async function updateBook(id, data) {
  return await put(endpoints.byId + id, data);
}

export async function deleteBook(id) {
  return del(endpoints.byId + id);
}
