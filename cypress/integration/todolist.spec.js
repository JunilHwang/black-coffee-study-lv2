before(() => {
  cy.visit("http://127.0.0.1:8080");
});

describe("TodoList 테스트", () => {

  const baseURL = "https://js-todo-list-9ca3a.df.r.appspot.com/api";
  const teamText = "E2E-Test-Team";
  const memberText = "E2E-Member";
  const newTodoText = "E2E Todo Item";

  it("Team을 추가한다.", () => {
    cy.get("#add-team-button").click();
    cy.focused().type(teamText).type('{enter}');
    cy.contains(teamText).should("be.visible");
  });

  it("Team을 선택하여 이동한다.", () => {
    cy.intercept("GET", `${baseURL}/teams/**`).as("getTeam");
    cy.get(".team-list-container").contains(teamText).first().click();
    cy.wait("@getTeam");
    cy.get("#user-title strong").contains(teamText).should("be.visible");
    cy.get("#todo-list-of-team").children(".todoapp-container").should("have.length", 0);
  });

  it("Member를 추가한다.", () => {
    cy.intercept("POST", `${baseURL}/teams/**/members`).as("postMember");
    cy.get("#add-user-button").click();
    cy.focused().type(memberText).type('{enter}');
    cy.wait("@postMember");
    cy.get(".todoapp-container").should("have.length", 1);
  });

  it("todo list에 todoItem을 키보드로 입력후 enter키를 눌러 추가하기", () => {
    cy.intercept("GET", `${baseURL}/teams/**/members/**`).as("getTodo");
    cy.get(".todoapp-container").first().as("container");
    cy.get("@container").get(".new-todo").type(newTodoText).type('{enter}');
    cy.wait("@getTodo");
    cy.get("@container").get(".todo-list li").first().contains(newTodoText).should("be.visible");
  });

  it("todo list의 체크박스를 클릭하여 complete 상태로 변경.", () => {
    // li tag 에 completed class 추가, input 태그에 checked 속성 추가
    cy.intercept("GET", `${baseURL}/teams/**/members/**`).as("getTodo");
    cy.get(".todoapp-container").first().get(".todo-list li").first().as("container");
    cy.get("@container").get(".toggle").first().click();
    cy.wait("@getTodo");
    cy.get("@container")
      .should("have.class", "completed")
        .get(".toggle")
        .should("be.checked");

    cy.get("@container").get(".toggle").first().click();
    cy.wait("@toggleTodo");
    cy.get("@container")
      .should("not.have.class", "completed")
        .get(".toggle")
        .should("be.checked");
  });

  it("todoItem을 더블 클릭시 input 모드로 변경", () => {
    cy.get(".todoapp-container").first().get(".todo-list li").first().as("container");
    cy.get("@container").get("label").dblclick();
    cy.get("@container").should("have.class", "editing");
  });

  it("todoItem의 수정 상태에서 esc 입력시 view 모드로 변경", () => {
    cy.get(".todoapp-container").first().get(".todo-list li").first().as("container");
    cy.get("@container").get("input").type(`{esc}`)
    cy.get("@container").should("not.have.class", "editing");
  });

  it("todoItem을 수정", () => {
    const updatedTodoText = `${newTodoText} update`;
    cy.intercept("GET", `${baseURL}/teams/**/members/**`).as("getTodo");
    cy.get(".todoapp-container").first().get(".todo-list li").first().as("container");
    cy.get("@container").get("label").dblclick();
    cy.get("@container").get("input").type(" update").type('{enter}');
    cy.wait("@getTodo");
    cy.get("@container").get('label').should("text", updatedTodoText);
  });

  it("todoItem의 갯수를 counting", () => {
    cy.get(".todoapp-container").first().as("container");
    cy.get("@container").get(".todo-list").children().should("have.length", 1);
    cy.get("@container").get(".todo-count strong").should("text", "1");
  });

  it("todoItem을 삭제하기", () => {
    cy.intercept("GET", `${baseURL}/teams/**/members/**`).as("getTodo");
    cy.get(".todoapp-container").first().as("container");
    cy.get("@container").first().get(".todo-list li").first().get(".destroy").click();
    cy.wait("@getTodo");
    cy.get("@container").get(".todo-list").children().should("have.length", 0);
    cy.get("@container").get(".todo-count strong").should("text", "0");
  });

  it("Team을 삭제한다.", () => {
    cy.get("[data-ref=removeMember]").click();
  });
});
