// Vamos importar '{ keyframes, css }' para fazer animações no CSS.
import styled, { keyframes, css } from 'styled-components';

export const Title = styled.h1`
  font-size: 24px;
  /* Conseguimos controlar propriedades do css baseado nas props que o componente recebe */
  color: ${props => (props.error ? 'red' : 'white')};
`;

// Vamos criar a animação de rotação do button. Utilizamos os keyframes da mesma maneira como usamos no css
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #EEE;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

// Conseguimos pegar a props de loading dentro de '.attrs'
export const SubmitButton = styled.button.attrs(props => ({
  // Conseguimos passar atributos e propriedades pelo css
  type: 'submit',
  // Pegado as props, podemos setar a propriedade disabled, baseado na props loading
  disabled: props.loading,
}))`
  background: #00bfff;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* Utilizamos o '&' comercial para se referir ao elemento, no caso ao 'button' */
  /* Nos referimos aqui a quando o botão estiver disabled */
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Como podemos passar um conjunto de propriedades aqui vamos usar o 'css' que importamos lá em cima */

  /* Como nessa condição não teremos um 'else', podemos usar '&&' ao invés de '?' e ':' */
  ${props => props.loading && css`
    svg {
      animation: ${rotate} 2s linear infinite;
    }
  `}

`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0;
    align-items: center;

    /* Consigo referenciar ao elemento atual + alguma outra coisa no styled-components: '& + <elemento>' */
    /* Basicamente este estilo será aplicado toda vez que houver um li antes dele (last-child) */
    & + li {
      border-top: 1px solid #eee;
    }

    a, a:link, a:visited, a:active {
      color: #00bfff;
      text-decoration: none;
    }
  }
`;
