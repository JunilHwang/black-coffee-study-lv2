import { RestClient } from "../core/RestClient";

export const todoBaseURL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';
export const todoAdapter = new RestClient(todoBaseURL);
