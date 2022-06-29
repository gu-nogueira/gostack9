import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.mt + 'px'};
  margin-bottom: ${(props) => props.mb + 'px'};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-right: 5px;
  }

  button + button {
    margin-left: 20px;
  }
`;

export const FormsWrapper = styled.div``;
