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