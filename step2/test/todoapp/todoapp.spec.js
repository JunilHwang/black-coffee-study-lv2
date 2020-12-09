import { todoMockInit, todoMockReset } from './mockApi';
import App from "../../src/todoapp/App";
import {getByText} from "@testing-library/dom";
import {waitFor} from "@babel/core/lib/gensync-utils/async";

let container, $app;

beforeEach(() => {
  todoMockInit();
  container = document.createElement('div');
  $app = new App(container);
});

afterEach(() => {
  container = null;
  todoMockReset();
});

it('투두리스트를 읽어오는 통신 테스트', async () => {
  await waitFor(() => $app.$target.innerHTML);
  // await waitFor(() => expect(getByText(container, "abc")).toBeVisible());
});