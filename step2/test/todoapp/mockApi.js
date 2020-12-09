import MockAdapter from 'axios-mock-adapter';
import todoList from './todo-list.json';
import axios from "axios";
import {todoBaseURL} from "../../src/todoapp/adapter/todoAdapter";

const mockAxios = new MockAdapter(axios);

export function todoMockInit () {
  mockAxios.onGet(`${todoBaseURL}/users`).reply(() => {
    console.log(todoList);
    return [200, todoList];
  });
  const userId = "1607513733976";
  mockAxios.onGet(`${todoBaseURL}/users/${userId}/items`).reply(() => {
    const items = todoList.find(v => v._id === userId).todoList;
    console.log(items);
    return [200, items];
  });
}

export function todoMockReset () {
  mockAxios.reset();
}
