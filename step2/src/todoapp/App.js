import {Component} from "./core/Component";
import {UserContainer} from "./containers/UserContainer";
import {TodoContainer} from "./containers/TodoContainer";
import {FETCH_USERS, SET_USER, SET_USERS, userStore} from "./store/userStore";
import {getQuery} from "./utils";
import {SET_TODO_ITEMS, todoStore} from "./store/todoStore";

export default class App extends Component{

  async componentInit () {
    const users = await userStore.dispatch(FETCH_USERS);
    const userId = getQuery('user_id');
    if (userId) {
      const selectedIndex = Math.max(users.findIndex(({ _id }) => _id === userId), 0);
      userStore.commit(SET_USER, selectedIndex);
      todoStore.commit(SET_TODO_ITEMS, users[selectedIndex].todoList);
    }
  }

  $children =  () => ({
    UserContainer: { constructor: UserContainer },
    TodoContainer: { constructor: TodoContainer },
  })

  template () {
    return `
      <div data-component="UserContainer"></div>
      <section data-component="TodoContainer" class="todoapp"></section>
    `;
  }

}
