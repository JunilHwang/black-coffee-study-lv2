import MockAdapter from 'axios-mock-adapter';
import todoList from './todo-list.json';
import axios from "axios";
import {todoBaseURL} from "../../src/todoapp/adapter/todoAdapter";

const mockAxios = new MockAdapter(axios);

export function todoMockInit () {

  const userId = "1607513733976";

  mockAxios
    .onGet(`${todoBaseURL}/users`)
      .reply(() => {
        console.log(todoList);
        return [200, todoList];
      })
    .onGet(`${todoBaseURL}/users/${userId}/items`)
      .reply(() => {
        const items = todoList.find(v => v._id === userId).todoList;
        console.log(items);
        return [200, items];
      })
    .onPost(`${todoBaseURL}/users/${userId}/items`)
      .reply(({ data }) => {
        const items = todoList.find(v => v._id === userId).todoList;
        const newItem = {
          _id: "20201209",
          contents: data.contents,
          isCompleted: false,
          priority: "NONE"
        };
        items.push(newItem);
        console.log(newItem);
        return [200, newItem];
      })

}

export function todoMockReset () {
  mockAxios.reset();
}
