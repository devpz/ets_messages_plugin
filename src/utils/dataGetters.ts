import axios from "axios";

const baseURL = "http://localhost:3000/api/v1/";

export function getCategories() {
  return axios.post(baseURL + "get-all-categories").then((res) => res.data);
}

export function getMessages() {
  return axios.post(baseURL + "get-all-messages").then((res) => res.data);
}
