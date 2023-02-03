/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){

    beforeEach(function(){
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste,'
        cy.get('input[name="firstName"]').type('Fabio')
        cy.get('input[name="lastName"]').type('Tavares')
        cy.get('input[id="email"]').type('fabio@exemplo.com')
        cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0})
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('input[name="firstName"]').type('Fabio')
        cy.get('input[name="lastName"]').type('Tavares')
        cy.get('input[id="email"]').type('fabio@exemplo,com')
        cy.get('textarea[id="open-text-area"]').type('Teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('Campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('input[id="phone"]')
            .type('Fabio')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('input[name="firstName"]').type('Fabio')
        cy.get('input[name="lastName"]').type('Tavares')
        cy.get('input[id="email"]').type('fabio@exemplo,com')
        cy.get('input[id="phone-checkbox"]').click()
        cy.get('textarea[id="open-text-area"]').type('Teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('input[name="firstName"]')
            .type('Fabio')
            .should('have.value', 'Fabio')
            .clear()
            .should('have.value', '')
        cy.get('input[name="lastName"]')
            .type('Tavares')
            .should('have.value', 'Tavares')
            .clear()
            .should('have.value', '')
        cy.get('input[id="email"]')
            .type('fabio@exemplo,com')
            .should('have.value', 'fabio@exemplo,com')
            .clear()
            .should('have.value', '')
        cy.get('input[id="phone-checkbox"]').click()
        cy.get('input[id="phone"]')
            .type('99995555')
            .should('have.value', '99995555')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })
})