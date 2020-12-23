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

  it("todoItem을 추가한다", () => {
    cy.intercept("GET", `${baseURL}/teams/**/members/**`).as("getTodo");
    cy.get(".todoapp-container").first().as("container");
    cy.get("@container").get(".new-todo").type(newTodoText).type('{enter}');
    cy.wait("@getTodo");
    cy.get("@container").get(".todo-list li").eq(0).contains(newTodoText).should("be.visible");
  });

  // it("todoItem을 수정한다", () => {
  //   const updatedTodoText = "새로운 할 일 수정"
  //   cy.get("#todo-list li label").eq(0).dblclick()
  //   cy.focused().type(" 수정")
  //   cy.focused().type('{enter}')
  //   cy.get("#todo-list li label").eq(0).should("text", updatedTodoText)
  // });
  //
  // it("todoItem을 완료한다.", () => {
  //   cy.get("#todo-list li input.toggle").eq(0).click()
  //   cy.get("#todo-list li").eq(0).should("have.class", "completed")
  // });
  //
  // it("todoItem을 삭제한다", () => {
  //   cy.get("#todo-list li button.destroy").eq(0).click({ force: true })
  // });

  it("Team을 삭제한다.", () => {
    cy.get("[data-ref=removeMember]").click();
  });
});
