import MockAdapter from 'axios-mock-adapter';
import todoList from './todo-list.json';
import axios from "axios";
import {todoBaseURL} from "../../src/todoapp/adapter/todoAdapter";

const mockAxios = new MockAdapter(axios);

export function todoMockInit () {

  const userId = "1607513733976";
  const itemId1 = "202012092343";
  const itemId2 = "1607513733979";

  mockAxios
    .onGet(`${todoBaseURL}/users`)
      .reply(() => {
        // console.log(todoList);
        return [200, todoList];
      })
    .onGet(`${todoBaseURL}/users/${userId}/items`)
      .reply(() => {
        const items = todoList.find(v => v._id === userId).todoList;
        // console.log(items);
        return [200, items];
      })
    .onPost(`${todoBaseURL}/users/${userId}/items`)
      .reply(({ data }) => {
        const { contents } = JSON.parse(data);
        const items = todoList.find(v => v._id === userId).todoList;
        const newItem = {
          _id: itemId1,
          isCompleted: false,
          priority: "NONE",
          contents,
        };
        items.push(newItem);
        // console.log(newItem);
        return [200, newItem];
      })
    .onPut(`${todoBaseURL}/users/${userId}/items/${itemId2}`)
      .reply(({ data }) => {
        const { contents } = JSON.parse(data);
        const items = todoList.find(v => v._id === userId).todoList;
        const item = items.find(v => v._id === itemId2);
        item.contents = contents;
        // console.log(item);
        return [200, item];
      })
    .onDelete(`${todoBaseURL}/users/${userId}/items/${itemId2}`)
      .reply(() => {
        const items = todoList.find(v => v._id === userId).todoList;
        const itemIndex = items.findIndex(v => v._id === itemId2);
        items.splice(itemIndex, 1);
        return [200];
      })

}

export function todoMockReset () {
  mockAxios.reset();
}
