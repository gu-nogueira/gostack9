import React from 'react';
import PropTypes from 'prop-types';

// Para esse novo componente não vamos criar ele no formato de classe e sim no formato de função pois não vamos manipular o state (estado) dele

// Agora para receber 'tech' que passamos no componente dentro de 'TechList', podemos pegar passando como parâmetro na função o 'props' assim, conseguimos pegar com 'props.tech' ou desestruturamos e pegamos dentro da função como '{ tech }'

// Recebemos também a função 'onDelete' onDelete que passamos dentro do props 

function TechItem({ tech, onDelete }) {
  return (
    <li>
      {tech}
      {/* Precisamos adicionr um 'type="button"' para o form não atualizar, pois por padrão seu comportamento é de reconhecer como um botão do próprio form
      IMPORTANTE: não podemos chamar aqui simplesmente 'this.handleDelete(tech)', pois dessa forma o javascript irá automaticamente executar a função por vir seguida de parênteses. O que devemos fazer é criar uma arrow function antes, dessa forma não irá executar assim que a página carregar */}
      <button type="button" onClick={onDelete}>Remover</button>
    </li> 
  );
}

// Os 'defaultProps' são valores padrão que definimos quando não é passado a propriedade para o componente.
// Por exemplo: vamos supor que ao chamar o componente TechItem, não passsamos a prop 'tech': basta alterarmos uma propriedade dentro do componente chamado 'defaultProps'
TechItem.defaultProps = {
  tech: 'Oculto',
};

TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default TechItem;