import styled from 'styled-components';

export const ProductList = styled.ul`
  display: grid;
  /* Isso faz com que crie 3 espaçamentos de grid com 1 largura igual */
  grid-template-columns: repeat(3, 1fr);
  /* grid gap distancia a grid */
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    /* O sinal de maior indica que só estilizará strongs que estiverem exatamente nesta hierarquia */
    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    /* Novamente, sinal de maior para não mexer em outros spans */
    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      /* O margin top auto faz com que não quebre a estilização caso o título do produto seja muito grande */
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: #49368e;
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        /* Flex 1 faz com que ocupe todo o tamanho possível */
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
