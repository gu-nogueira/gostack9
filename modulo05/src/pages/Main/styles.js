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

export const Container = styled.section`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    /* Isso são estilos encadeados */
    /* Interessante, usar o svg diretamente no css para ícones */
    svg {
    margin-right: 10px;
    }

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
