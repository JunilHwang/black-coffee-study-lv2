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

  it("Team을 선택한다.", () => {
    cy.intercept("GET", `${baseURL}/teams/**`).as("getMembers");
    cy.get(".team-list-container").contains(teamText).click();
    cy.wait("@getMembers");
    cy.get("#user-title strong").contains(teamText).should("be.visible");
  });

  it("Member를 추가한다.", () => {
    cy.get("#add-user-button").click();
    cy.focused().type(memberText).type('{enter}');
    cy.get(".todoapp-container h2").contains(memberText).should("be.visible");
  });

  it("todo list에 todoItem을 키보드로 입력후 enter키를 눌러 추가하기", () => {
    cy.intercept("GET", `${baseURL}/teams/**/members/**`).as("getTodo");
    cy.get(".todoapp-container").first().as("container");
    cy.get("@container").get(".new-todo").type(newTodoText).type('{enter}');
    cy.wait("@getTodo");
    cy.get("@container").get(".todo-list li").eq(0).contains(newTodoText).should("be.visible");
  });

  it("todo list의 체크박스를 클릭하여 complete 상태로 변경.", () => {
    // li tag 에 completed class 추가, input 태그에 checked 속성 추가
    cy.intercept("PUT", `${baseURL}/teams/**/members/**/items/**/toggle`).as("toggleTodo");
    cy.get(".todoapp-container").first().get(".todo-list li").as("container");
    cy.get("@container").get(".toggle").first().click();
    cy.wait("@toggleTodo");
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
    cy.get(".todoapp-container").first().get(".todo-list li").as("container");
    cy.get("@container").get("label").dblclick();
    cy.get("@container").should("have.class", "editing");
  });

  it("todoItem의 수정 상태에서 esc 입력시 view 모드로 변경", () => {
    cy.get(".todoapp-container").first().get(".todo-list li").as("container");
    cy.get("@container").get("input").type(`{esc}`)
    cy.get("@container").should("not.have.class", "editing");
  });

  it("todoItem을 수정", () => {
    const updatedTodoText = `${newTodoText} update`;
    cy.intercept("PUT", `${baseURL}/teams/**/members/**/items/**`).as("putTodo");
    cy.get(".todoapp-container").first().get(".todo-list li").as("container");
    cy.get("@container").get(".todo-list li label").first().get('label').dblclick();
    cy.focused().type(" update").type('{enter}');
    cy.wait("@putTodo");
    cy.get("@container").get(".todo-list li label").first().get('label').should("text", updatedTodoText)
  });
  //
  // it("todoItem을 삭제한다", () => {
  //   cy.get("#todo-list li button.destroy").eq(0).click({ force: true })
  // });

  it("Team을 삭제한다.", () => {
    cy.get("[data-ref=removeMember]").click();
  });
});
