import * as cypress from "cypress";
import accountsData from '../fixtures/accounts.json';

describe('Login into the Accounts', () => {
  it('Visits the Login Account Page', () => {
    cy.visit('/login');
    for(let i = 0; i < 500; i++) {
      let account: { username: string; password: string; firstName: string; lastName: string; } = accountsData[Math.floor(Math.random() * (accountsData.length-1))];
      cy.visit('/login');
      cy.contains('Login');
      cy.get("#username").type(account.username);
      cy.get("#password").type(account.password);
      cy.get("#loginBtn").click();
      cy.wait(1000);
      cy.get("#logoutBtn").click();
    }
  });
});
