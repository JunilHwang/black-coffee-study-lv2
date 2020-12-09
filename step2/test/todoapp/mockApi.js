import MockAdapter from 'axios-mock-adapter';
import axios from "axios";

const mockAxios = new MockAdapter(axios);


export function todoMockInit () {
  mockAxios.onGet("/")
}
