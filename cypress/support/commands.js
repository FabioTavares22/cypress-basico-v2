Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('input[name="firstName"]').type('Fabio')
    cy.get('input[name="lastName"]').type('Tavares')
    cy.get('input[id="email"]').type('fabio@exemplo.com')
    cy.get('textarea[id="open-text-area"]').type('Teste')
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()
})