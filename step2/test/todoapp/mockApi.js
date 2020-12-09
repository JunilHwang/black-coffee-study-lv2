import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import todoList from './todo-list.json';

const mockAxios = new MockAdapter(axios.create({
  baseURL: "https://js-todo-list-9ca3a.df.r.appspot.com/api"
}));

export function todoMockInit () {
  mockAxios.onGet("/users", () => [200, todoList]);
}

export function todoMockReset () {
  mockAxios.reset();
}
