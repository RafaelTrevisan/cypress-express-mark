// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Função criada para acessar a página, clicar na tast e clicar em criar
Cypress.Commands.add('createTask', (taskNameCommand = '')=> {
    cy.visit('/')

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')

    if (taskNameCommand !== ''){
        cy.get('@inputTask')
            .type(taskNameCommand)
    }
 
    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('isRequired', (targetMessage) => {
    
    cy.get('@inputTask')
    .invoke('prop', 'validationMessage')
    .should((text) => {
        expect(
            targetMessage
        ).to.eq(text)
    })
})

//Função criada para remover a task por nome pela api
Cypress.Commands.add('removeTaskByName', (taskNameCommand)=> {
    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE',
        body: {name: taskNameCommand}
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

//Função criada para criar uma task nova por  api
Cypress.Commands.add('postTask', (task)=> {
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

