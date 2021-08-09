// Colocamos entre chaves depois pois é uma segunda importação
import React, { Component } from 'react';

// Components
import TechItem from './TechItem';
class TechList extends Component {

  // No formato de Class component temos a opção de definir os 'defaultProps' dessa forma:
  static defaultProps = {
    // tech: 'Oculto',
  };

  // manipulamos os estados do componente através da variável 'state'. Conseguimos manipular o estado com essa estrutura de classe
  // Por baixo dos panos, o babel interpreta a variável 'state' dentro de um método constructor, então ficaria mais ou menos:
  /** constructor() {
   *    this.state = {...}  
   *  }
  */  
  state = {
    // newTech receberá o valor da nova tecnologia dentro do input
    newTech: '',
    techs: [],
  };

  /**
   * CICLO DE VIDA DO COMPONENTE
   */

  // Executado assim que o componente aparece em tela (no momento em que é montado)
  componentDidMount() {

    // Verifica se há algo em localStorage para preencher o state
    const techs = localStorage.getItem('techs');
    if (techs) {
      // JSON.parse analisa uma construção em JSON e transforma em um objeto javascript
      this.setState({ techs: JSON.parse(techs) });
    }


  }
  // Recebe como parâmetro 'prevProps' e 'prevState' no método, sendo as props e o state antigos. Portanto, pode-se fazer comparações das props e state antes das alterações com os alterados em 'this.props' ou 'this.state'
  
  // Utilizando localStorage:
  
  // Vamos marcar com '_' o prevProps pois não vamos utilizá-lo
  // Executado sempre que houver alterações nas props ou no state do componente
  componentDidUpdate(_, prevState) {
    // Fazemos essa verificação pois só queremos que guarde as techs no localStorage quando elas forem para o atributo 'techs' do nosso objeto 'state' e não quando forem para 'newTech', que é a informação armazenada quando o usuário digita no input
    if (prevState.techs !== this.state.techs) {
      // Como o localStorage não aceita ARRAYS, devemos transformá-lo em um JSON
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  // Executado quando o componente deixa de existir
  componentWillUnmount() {
    // Este componente será usado muito pouco. Por exemplo, caso usássemos um 'addEventListener()' do javascript para montar o componente, utilizariamos o componentWillUnmount para limpar qualquer tipo de sujeira como o eventlistener por exemplo para limpar por completo o componente e voltá-lo a sua estrutura original
  }


  // IMPORTANTE: as funções que manipulam state devem TODAS ficar no mesmo componente onde foi declarado o state, elas NÃO podem ficar DECLARADAS em outros componentes pois elas não reconheceriam os parâmetros existentes dentro de state

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
    // Uma coisa importante de se saber da manipulação de arrays e objetos dentro do setState: não é possível ALTERAR um array ou um objeto, temos que remontá-lo COMPLETAMENTE, atualizando TODOS os seus valores (s o bad).

    // Vamos criar um novo array, então '[]'
    // Vamos então passar '...' o spread operator, para copiar todos os valores de 'this.state.techs'
    // E na última posição do array, vamos passar finalmente o 'newTech', como um '.push' de array comum do javascript
    this.setState({ techs: [... this.state.techs, this.state.newTech],
    // Agora vamos por fim definir 'newTech' como vazio, para zerar o input
    newTech: ''
    })
  }

  // Vamos receber o tech dentro da função 
  handleDelete = (tech) => {
    // Vamos usar o setState para atualizar o estado
    // A melhor forma de atualizar um estado removendo algum item de dentro dele é utilizando o '.filter()' (uso parecido com o .map), assim passamos qual item queremos remover percorrendo o array
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
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

          Vamos colocar '()' ao redor da tag <li> para inserir mais elementos (o <button>)
          */}
          {/* A 'key' deve ficar do lado onde foi feito o map no react e não dentro do componente */}
          {/* Outro problema que vamos resolver é passando tech como PROPRIEDADE do componente (outro conceito do react), pois assim no componente TechItem irá reconhecer a variável tech */}
          {/* Temos que passar outra propriedade para nosso componente que será uma função, pois a função não é reconhecida por TechItem */}
          {this.state.techs.map(tech => <TechItem key={tech} tech={tech} onDelete={() => this.handleDelete(tech)}/>)}
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