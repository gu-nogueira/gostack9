import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin-left: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;

    button {
      padding: 5px 5px !important;
      margin: 0 10px;
    }
  }
  @media only screen and (max-width: 1049px) {
    flex-direction: column;
    & > h4 {
      margin: 0 auto 10px auto;
    }
    div {
      margin-left: 0;
      button {
        margin-top: 10px;
      }
    }
  }
`;
