import {Component} from "../../core/Component";
import {userStore} from "../../store/userStore";

export class UserTitle extends Component {

  template () {
    if (!userStore.$getters.selectedUser) return ``;
    return `
      <span><strong>${userStore.$getters.selectedUser?.name}</strong>'s Todo List</span>
    `;
  }

}
