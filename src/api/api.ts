import axios from "axios";
import { ISearchLists } from "./api.interface";

// todo
// const API_URL = process.env.RB_API_URL;
const API_URL = "http://localhost:5000/api";

export const api = Object.freeze({
  async fetchSearchList(): Promise<ISearchLists> {
    const response = await axios.get(`${API_URL}/searchList`);
    return response.data;
  },
  // async fetchTodoById(id) {
  //   const response = await axios.get(`${API_URL}/todos/${id}`);

  //   return response.data;
  // },
  // async createTodo(newTodo) {
  //   const response = await axios.post(`${API_URL}/todos`, newTodo);

  //   return response.data;
  // },
  // async updateTodo(newTodo) {
  //   const { id, created, ...todoPayload } = newTodo;

  //   const response = await axios.put(`${API_URL}/todos/${id}`, todoPayload);

  //   return response.data;
  // },
  // async deleteTodo(todoId) {
  //   const response = await axios.delete(`${API_URL}/todos/${todoId}`);

  //   const isDeleted = response.status === 204;

  //   return { isDeleted };
  // },
});
