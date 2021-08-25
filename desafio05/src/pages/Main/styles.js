import styled, { keyframes, css } from 'styled-components';

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
    border: ${props => (props.error ? '1px solid red' : '1px solid #EEE')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
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

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

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

    & + li {
      border-top: 1px solid #eee;
    }

    a, a:link, a:visited, a:active {
      color: #00bfff;
      text-decoration: none;
    }
  }
`;
