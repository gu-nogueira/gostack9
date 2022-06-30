import styled, { css } from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.mt + 'px'};
  margin-bottom: ${(props) => props.mb + 'px'};

  & + & {
    margin-top: 15px;
  }
`;

export const Wrapper = styled.div`
  ${(props) =>
    props.flex &&
    css`
      display: flex;
      align-items: center;
    `}

  ${(props) =>
    props.stretch &&
    css`
      width: stretch;
    `}

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
  }

  div {
    margin-right: 5px;
  }

  button + button {
    margin-left: 20px;
  }

  & + & {
    margin-left: 30px;
  }
`;

export const FormsWrapper = styled.div``;
