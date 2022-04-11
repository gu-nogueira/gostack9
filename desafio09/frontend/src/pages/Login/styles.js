import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Column = styled.div`
  width: 100%;
  align-self: center;
  animation: ${fadeIn} 0.5s;

  img {
    width: 180px;
    height: 50px;
  }

  & + div {
    margin-left: 15px;
    padding-left: 15px;
  }

  h1 {
    margin-top: 40px;
    line-height: 42px;
  }

  small {
    margin-top: 20px;
    text-align: center;
  }

  /*
   *  Mobile
   */

  @media only screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin-top: 15%;
    }

    & + div {
      margin: 30px 0 0;
      padding: 0;
    }

    h1 {
      text-align: center;
    }
  }
`;
