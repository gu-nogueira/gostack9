// Colocamos entre chaves depois pois é uma segunda importação
import React, { Component } from 'react';

class TechList extends Component {

  // manipulamos os estados do componente através da variável 'state'. Conseguimos manipular o estado com essa estrutura de classe
  // Por baixo dos panos, o babel interpreta a variável 'state' dentro de um método constructor, então ficaria mais ou menos:
  /** constructor() {
   *    this.state = {...}  
   *  }
  */  
  state = {
    // newTech receberá o valor da nova tecnologia dentro do input
    newTech: '',
    techs: [
      'Node.js',
      'ReactJS',
      'React Native',
    ]
  };

  // Por padrão, precisamos criar os métodos dentro do componente assim, pois caso contrário o método não terá acesso a variável this (onde está o state). ( OBS: Não entendi mto bem o pq, preciso estudar melhor ES6 urgente)
  handleInputChange = (e) => {
    // Não podemos alterar 'state' diretamente, pois ele é imutável no react. Vamos utilizar o método setState
    this.setState({ newTech: e.target.value });
  }

  // Utilizamos evento 'e' no handleSubmit, pois no comportamento padrão da tag 'form', ao dar 'submit' ele atualiza a página e não queremos isso
  handleSubmit = (e) => {
    // 'preventDefault' irá prevenir o comportamento padrão da tag 'form' dentro do html, que seria de recarregar a página
    e.preventDefault();

    // Lembrando de utilizar o setState para alterar o estado no React
    // Uma coisa importante de se saber da manipulação de arrays e objetos dentro do setState: não é possível ALTERAR um array ou um objeto, temos que remontá-lo COMPLETAMENTE, atualizando TODOS os seus valores (so bad).

    // Vamos criar um novo array, então '[]'
    // Vamos então passar '...' o spread operator, para copiar todos os valores de 'this.state.techs'
    // E na última posição do array, vamos passar finalmente o 'newTech', como um '.push' de array comum do javascript
    this.setState({ techs: [... this.state.techs, this.state.newTech],
    // Agora vamos por fim definir 'newTech' como vazio, para zerar o input
    newTech: ''
    })
  }

  // Todo componente de classe do React precisa obrigatoriamente ter o método render(), por onde será retornado o nosso html (jsx)
  render() {
    return (
      // <>
      <form onSubmit={this.handleSubmit}>
      {/* Vamos testar se está havendo a atualização do 'handleInputChange' */}
        {/* <h1>{this.state.newTech}</h1> */}
        <ul>
          {/*
          O JSX aceita javascript, basta passar '{}'

          Podemos retornar jsx também de dentro do javascript, muito louco!!!

          Um erro apareceu no console do navegador, pois toda vez que temos um '.map', uma interação ou uma lista de itens, precisamos passar um campo 'key' no elemento 'Child', e esse campo deve ser único (um id por exemplo). Neste caso o úncio campo único que temos é o próprio techs. Isso faz com que o react se encontre mais rápido com qual item ele precisa atualizar ou remover, por exemplo

          */}
          {this.state.techs.map(tech => <li key={tech}>{tech}</li>)}
        </ul>
        {/* Não podemos passar no react um input aqui diretamente pois ele requisita que os elementos do render estejam em volta de um container (uma div por exemplo). Neste caso, estaremos utilizando uma tag sem nome (<> e </>), esta é chamada de 'fragment' dentro do React

        Uma boa prática de quando usamos o input para armazenar seu valor dentro do estado, é passar o estado dentro do 'value', assim, se o estado sofrer qualquer alteração, o input atualizará também */}
        <input type="text" onChange={this.handleInputChange} value={this.state.newTech} />
        <button type="submit">Enviar</button>
      </form>
      // </>
    );
  }
}

export default TechList;