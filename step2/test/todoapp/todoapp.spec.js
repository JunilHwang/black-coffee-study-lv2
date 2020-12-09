import { todoMockInit, todoMockReset } from './mockApi';
import App from "../../src/todoapp/App";
import {getByText} from "@testing-library/dom";
import {waitFor} from "@babel/core/lib/gensync-utils/async";
import axios from "axios";
import {todoBaseURL} from "../../src/todoapp/adapter/todoAdapter";


let container, $app;

beforeEach(() => {
  todoMockInit();
  container = document.createElement('div');
  $app = new App(container);
  document.body.append(container);
});

afterEach(() => {
  document.body.innerHTML = '';
  todoMockReset();
});

it('투두리스트를 읽어오는 통신 테스트', async () => {
  await waitFor(() => getByText(container, "junil").click());
});