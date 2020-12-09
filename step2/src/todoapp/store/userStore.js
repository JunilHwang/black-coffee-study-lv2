import {Store} from '../core/Store';
import TodoService from "../services/TodoService";

export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';
export const FETCH_USERS = 'FETCH_USERS';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const userStore = new Store({
  state: {
    users: [],
    selectedIndex: -1,
  },

  getters: {
    selectedUser: ({ users, selectedIndex }) => selectedIndex !== -1 ? users[selectedIndex] : null,
  },

  mutations: {
    [SET_USERS] (state, users) {
      state.users = users;
    },
    [SET_USER] (state, selectedIndex) {
      state.selectedIndex = selectedIndex;
    },
  },

  actions: {
    async [FETCH_USERS] ({ commit }) {
      const users = await TodoService.fetchUsers();
      commit(SET_USERS, users);
      return users;
    },
    async [ADD_USER] ({ dispatch, commit }, name) {
      const { _id: userId } = await TodoService.addUser(name);
      const users = await dispatch(FETCH_USERS);
      commit(SET_USER, users.findIndex(user => user._id === userId));
      history.pushState({ user_id: userId }, null, `./?user_id=${userId}`);
    },
    async [REMOVE_USER] ({ dispatch, commit }, userId) {
      await TodoService.removeUser(userId);
      const users = await dispatch(FETCH_USERS);
      commit(SET_USER, 0);
      history.pushState({ user_id: users[0]._id }, null, `./?user_id=${users[0]._id}`);
    },
  }
})
