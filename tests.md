# Testes

Testes automatizados são usados para manter todas as funcionalidades da aplicação rodando de acordo, conforme a aplicação cresce. Isso é ótimo para ambientes de desenvolvimento em equipe e aplicações de larga escala.

## Testes unitários

- Testam uma função mínima e pura (isolada da aplicação), que não realiza efeitos colaterais, como acessos a banco de dados ou integrações externas

## Testes de integração

- São os principais testes do `backend`, pois testam funcionalidades completas como acesso à rotas até o retorno do controller;
- Podem ter acesso a APIs externas, acesso a banco de dados etc.
- Permitem `mocks`, que são uma espécie de funcionalidades fakes, que permitem acessos a APIs etc. porém de forma mais estática e manual;

## Testes E2E (End to End)

- Testes de interface (geralmente feitos somente na parte frontend), que simulam o acesso do usuário;

# TDD - Test Driven Development (Desenvolvimento dirigido a testes)

- Conceito que consiste em criar o teste antes da funcionalidade (testar algo que não existe ainda);
  > Serve como se fosse uma `TO DO list` do seu desenvolvimento;
- Exemplo: desenvolver um teste, testando uma funcionalidade específica;

- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `RED` - Teste falhou (funcionalidade ainda não está feita)
- ![#c5f015](https://via.placeholder.com/15/c5f015/000000?text=+) `GREEN` - 1º passo, desenvolver feature só para fazer o teste funcionar, não sendo necessário desenvolver da melhor forma
- ![#1589F0](https://via.placeholder.com/15/1589F0/000000?text=+) `REFACTOR` - Depois, nos preocupamos com refatoração

## Code coverage

- O que testar? Testei o suficiente? Falta algo?
- O `Code coverage` coleta informações das linhas de código que seus testes atuais não alcançaram;
- Devolve uma interface, discriminando os arquivos e a porcentagem que foram testados, ex: linha `x` não chegou nenhum teste nela;

## Jest

- Framework para testes que será utilizado tanto no Node.js, ReactJS e React Native;
- Possui todas as features em um só pacote (code coverage, testes multi-thread integrado);

### Instalação:

- Primeiro, adicionamos ele ao projeto: `yarn add jest -D`
- Depois, rodamos `yarn jest --init`
- O Jest fará algumas perguntas para configuração inicial.
  - Primeiro, se gostaríamos de criar um script "test" no `package.json`. Basta digitarmos `Y`
  - Segundo, se queremos usar typescript para configuração. `N`
  - Terceiro, se estamos utilizando `node` ou `jsdom`
  - Quarto, se querermos os reports coverages. `Y`
  - Quinto, se queremos usar `V8` ou `babel` para isntrumento do code coverage
  - Sexto, se queremos limpar automaticamente variáveis e resultados após os testes `Y`
- Feita a configuração inicial, vamos acessar o arquivo gerado `jest.config.js` e fazermos algumas configurações:

  - Vamos setar `bail: 1` para os testes pararem de rodar após alguma falha
  - Vamos setar `collectCoverage: true` para coletar as informçaões de coverage
  - Vamos setar `collectCoverageFrom: ['src/app/**/*.js']`, para definir de onde deve ser coletado os coverage, sendo necessário somente da pasta app, com dois asteriscos para pegar todas as pastas dentro de app, e `*.js` para pegar todos os arquivos com extensão .js
  - Vamos setar em `coverageReporters` somente `text` e `lcov`
  - Vamos setar o diretório de testes criando na raiz do projeto uma pasta `__tests__`, e setando `testMatch: ['**/__tests__/**/*.test.js'],`
  - Vamos setar para utilizar o `sucrase` e a sintaxe do ES6, instalando `yarn add --dev @sucrase/jest-plugin` e setando `transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" }`
  - Vamos setar `coverageDirectory: '__tests__/coverage'` para criar o coverage dentro de `__tests__`
  - E por fim, vamos realizar uma alteração em `nodemon.json`, passando um ignore para não ser restartado automaticamente:

  ```json
  {
    ...
    "ignore": [
      "__tests__"
    ]
  }
  ```

  ## Criando o primeiro teste

  - Vamos criar um arquivo `example.test.js`, e podemos rodar já `yarn test` para vermos
  - Por padrão não há syntax highlighting (intellisense) nos arquivos de testes. Por isso, uma boa prática (mesmo que não estejamos utilizando `typescript` em nossa aplicação é adicionarmos a definição de tipos para o `jest`): `yarn add -D @types/jest`
