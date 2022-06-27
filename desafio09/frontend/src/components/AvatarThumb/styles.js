import styled from 'styled-components';

export const Container = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  img {
  }

  div {
    background: ${(props) => props.color};
  }
`;
