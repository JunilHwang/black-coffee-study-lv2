import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { waitForDomChange, wait, getByText, fireEvent } from '@testing-library/dom';
import {createCounter} from "../src/backup/counter";
import {createServerCounter} from "../src/serverCounter/counter";

const mockAxios = new MockAdapter(axios);

const counter = createCounter({
  min: 8,
  max: 12,
  initVal: 10
})

let container;

beforeEach(() => {

  const response = () => ({
    value: counter.val(),
    isMax: counter.isMax(),
    isMin: counter.isMin()
  });

  mockAxios.onGet('/counter').reply(() => [200, response()]);
  mockAxios.onPut('/counter/inc').reply(() => {
    counter.inc();
    return [200, response()];
  });
  mockAxios.onPut('/counter/dec').reply(() => {
    counter.dec();
    return [200, response()];
  });

  container = document.createElement('div');
  document.body.appendChild(container);
  createServerCounter(container);
});

afterEach(() => {
  document.body.innerHTML = '';
  mockAxios.reset();
});

it('생성시 버튼과 초기값을 렌더링한다.', async () => {
  expect(getByText(container, "-")).toBeVisible();
  expect(getByText(container, "+")).toBeVisible();
  expect(getByText(container, "10")).toBeVisible();
});

it('+ 버튼 클릭시 서버에 inc요청을 보낸 후 응답값으로 뷰를 갱신한다.', async () => {
});

it('- 버튼 클릭시 서버에 dec 요청을 보낸 후 응답값으로 뷰를 갱신한다.', async () => {

});

it('최대값이면 + 버튼이 disabled 상태가 되고, 클릭해도 서버에 요청을 보내지 않는다', async () => {

});

it('최소값이면 - 버튼이 disabled 상태가 되고, 클릭해도 서버에 요청을 보내지 않는다', async () => {

});
