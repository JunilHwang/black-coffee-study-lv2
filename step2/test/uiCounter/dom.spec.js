import '@testing-library/jest-dom/extend-expect';
import {getByText, fireEvent, wait} from '@testing-library/dom';
import {createUICounter} from '../../src/uiCounter/counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  createUICounter(container, {
    initVal: 10,
    min: 8,
    max: 12
  });
});

afterEach(() => {
  document.body.innerHTML = '';
});

it('생성시 버튼과 초기값을 렌더링한다.', () => {
  expect(getByText(container, "-")).toBeVisible();
  expect(getByText(container, "+")).toBeVisible();
  expect(getByText(container, "10")).toBeVisible();
});

it('+ 버튼 클릭시 1 증가한다.', async () => {
  fireEvent.click(getByText(container, '+'));
  await wait(() => expect(getByText(container, "11")).toBeTruthy());
});

it('- 버튼 클릭시 1 감소한다.', async () => {
  fireEvent.click(getByText(container, '-'));
  await wait(() => expect(getByText(container, "9")).toBeTruthy());
});

it('Max값인 경우 + 버튼이 disabled 상태가 되며 클릭해도 증가하지 않는다.', async () => {
  fireEvent.click(getByText(container, '+'));
  fireEvent.click(getByText(container, '+'));
  await wait(() =>
    expect(getByText(container, "+", {selector: "[disabled]"})).toBeTruthy()
  );
  fireEvent.click(getByText(container, '+'));
  fireEvent.click(getByText(container, '+'));
  fireEvent.click(getByText(container, '+'));
  fireEvent.click(getByText(container, '+'));
  fireEvent.click(getByText(container, '+'));
  await wait(
    () => expect(getByText(container, "12")).toBeTruthy()
  );
});

it('Min값인 경우 - 버튼이 disabled 상태가 되며, 클릭해도 감소하지 않는다.', async () => {
  fireEvent.click(getByText(container, '-'));
  fireEvent.click(getByText(container, '-'));
  await wait(() =>
    expect(getByText(container, '-', {selector: "[disabled]"})).toBeTruthy()
  );
  fireEvent.click(getByText(container, '-'));
  fireEvent.click(getByText(container, '-'));
  fireEvent.click(getByText(container, '-'));
  fireEvent.click(getByText(container, '-'));
  fireEvent.click(getByText(container, '-'));
  await wait(
    () => expect(getByText(container, "8")).toBeTruthy()
  );
});
