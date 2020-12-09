import MockAdapter from 'axios-mock-adapter';
import todoList from './todo-list.json';
import axios from "axios";
import {todoBaseURL} from "../../src/todoapp/adapter/todoAdapter";

const mockAxios = new MockAdapter(axios);

export function todoMockInit () {
  mockAxios.onGet(todoBaseURL + "/users").reply(() => {
    console.log(todoList);
    return [200, todoList];
  });
}

export function todoMockReset () {
  mockAxios.reset();
}
