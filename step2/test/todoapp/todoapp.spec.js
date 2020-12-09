import { todoMockInit, todoMockReset } from './mockApi';
import App from "../../src/todoapp/App";
import {
  fireEvent,
  getAllByText,
  getByDisplayValue,
  getByPlaceholderText,
  getByText,
  queryAllByText,
  waitForDomChange
} from "@testing-library/dom";
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
  // 유저에 대한 검증
  await waitForDomChange({ container });
  const $name = getByText(container, "junil", { selector: "button[data-ref='select']" });
  await waitFor(() => expect($name).toBeVisible());

  // 타이블 변경 확인
  $name.click();
  await waitForDomChange({ container });
  const $title = getByText(container, "junil", { selector: "strong" });
  expect($title.parentElement.outerHTML).toEqual("<span><strong>junil</strong>'s Todo List</span>");

  // 아이템 리스트 확인
  await waitForDomChange({ container });
  const $items = getAllByText(container, /111|222|333/, { selector: "label[data-ref='contents']" });
  expect($items.length).toEqual(3);
});

it('투두리스트를 생성하는 통신 테스트', async () => {
  // 유저 선택
  await waitForDomChange({ container });
  getByText(container, "junil", { selector: "button[data-ref='select']" }).click();
  await waitForDomChange({ container }); // 로딩
  await waitForDomChange({ container }); // 로딩 완료

  // 아이템 추가
  const $appender = getByPlaceholderText(container, "할 일을 입력해주세요.");
  $appender.value = "444";
  fireEvent.keyPress($appender, { key: 'Enter' });
});