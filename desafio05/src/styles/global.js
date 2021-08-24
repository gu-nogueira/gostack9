// Vamos importar o createGlobalStyle do 'styled-components'
import { createGlobalStyle } from 'styled-components';

// Vamos exportar novamente o createGlobalStyle, que é uma função, vamos colocar o css compartilhado
export default createGlobalStyle`
  /* Resetando css */
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    /* Faz com que width e height totalizem com margin e padding, interessante não sabia disso */
    box-sizing: border-box;
  }

  /* Configuração padrão no id root da aplicação, que faz com que o conteúdo tenha sempre 100% de altura */
  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #00bfff;
    /* Deixa as fontes sem serrilhados */
    -webkit-font-smoothing: antialiased !important;
  }

  /* Inserindo mais algumas propriedades padrões interessantes */
  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
