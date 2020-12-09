import MockAdapter from 'axios-mock-adapter';
import todoList from './todo-list.json';
import axios from "axios";
import {todoBaseURL} from "../../src/todoapp/adapter/todoAdapter";

const mockAxios = new MockAdapter(axios);

export function todoMockInit () {

  const userId = "1607513733976";
  const itemId = "202012092343";

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
        const { contents } = JSON.parse(data);
        const items = todoList.find(v => v._id === userId).todoList;
        const newItem = {
          _id: itemId,
          isCompleted: false,
          priority: "NONE",
          contents,
        };
        items.push(newItem);
        console.log(newItem);
        return [200, newItem];
      })
    .onPut(`${todoBaseURL}/users/${userId}/items/${itemId}`)
      .reply(({ data }) => {
        const { contents } = JSON.parse(data);
        const items = todoList.find(v => v._id === userId).todoList;
        const item = items.find(v => v._id === itemId);
        item.contents = contents;
        console.log(item);
        return [200, item];
      })

}

export function todoMockReset () {
  mockAxios.reset();
}
