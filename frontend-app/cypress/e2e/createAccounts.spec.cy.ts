import * as cypress from "cypress";
import accountsData from '../fixtures/accounts.json';

describe('Create Accounts', () => {
  it('Visits the Create Account Page', () => {
    cy.visit('/create-account');
    cy.contains('Create Account');

    let remainingAccs = [53, 56, 63, 67, 70, 72, 80, 88, 89]
    for(let i = 0; i < remainingAccs.length; i++) {
      let account: { username: string; password: string; firstName: string; lastName: string; } = accountsData[remainingAccs[i]];
      cy.get("#firstName").type(account.firstName);
      cy.get("#lastName").type(account.lastName);
      cy.get("#username").type(account.username);
      cy.get("#password").type(account.password);
      cy.get("#confirmPassword").type(account.password);
      cy.get("#createAccountBtn").click();
      cy.wait(1000);
      cy.reload();
    }

    // accountsData.forEach((account: { username: string; password: string; firstName: string; lastName: string; }) => {
    //   cy.get("#firstName").type(account.firstName);
    //   cy.get("#lastName").type(account.lastName);
    //   cy.get("#username").type(account.username);
    //   cy.get("#password").type(account.password);
    //   cy.get("#confirmPassword").type(account.password);
    //   cy.get("#createAccountBtn").click();
    //   cy.wait(1000);
    //   cy.reload();
    // });
  });
});
// in 8:35 mins => 100 users were created using the above automation script
