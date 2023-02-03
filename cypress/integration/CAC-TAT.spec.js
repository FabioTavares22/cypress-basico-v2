/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){

    const three_seconds_in_ms = 3000

    beforeEach(function(){
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste,'
        cy.clock()
        cy.get('input[name="firstName"]').type('Fabio')
        cy.get('input[name="lastName"]').type('Tavares')
        cy.get('input[id="email"]').type('fabio@exemplo.com')
        cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0})
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(three_seconds_in_ms)

        cy.get('.success').should('not.be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        
        cy. clock ()

        cy.get('input[name="firstName"]').type('Fabio')
        cy.get('input[name="lastName"]').type('Tavares')
        cy.get('input[id="email"]').type('fabio@exemplo,com')
        cy.get('textarea[id="open-text-area"]').type('Teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(three_seconds_in_ms)

        cy.get('.error').should('not.be.visible')

    })

    it('Campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('input[id="phone"]')
            .type('Fabio')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        
        cy.clock()

        cy.get('input[name="firstName"]').type('Fabio')
        cy.get('input[name="lastName"]').type('Tavares')
        cy.get('input[id="email"]').type('fabio@exemplo,com')
        cy.get('input[id="phone-checkbox"]').click()
        cy.get('textarea[id="open-text-area"]').type('Teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(three_seconds_in_ms)

        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(three_seconds_in_ms)

        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){

        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(three_seconds_in_ms)

        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('Youtube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback', function(){
        cy.get('input[type="radio] [value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio]')
            .should('have.lenght', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checkd')
            .last()
            .uncheck()
            .should('not.be.checkd')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].to.equal('example.json'))
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].to.equal('example.json'))
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].to.equal('example.json'))
            })
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