import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.div`
  /*
   *  Input
   */
  display: flex;
  align-items: center;
  border: 1px solid ${colors.grey2};
  border-radius: 5px;
  height: 38px;
  padding: 0 2px;
  color: ${colors.grey2};
  svg {
    min-width: 16px;
    margin-left: 12px;
  }
  input {
    border: none;
    margin-left: 5px;
    padding: 0 0 0 5px;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    &::placeholder {
      color: ${colors.grey2};
    }
  }
  & + div {
    margin-top: 15px;
  }
  ${(props) =>
    props.focused &&
    css`
      transition: all 0.2s;
      border: 1px solid ${colors.purple} !important;
      svg {
        color: ${colors.purple};
      }
    `}
  /*
   *  Button
   */
  button[type='button'] {
    display: flex;
    border: none;
    padding: 4px 5px;
    border-radius: 3px;
    margin-right: 2px;
    background: none;
    &:active {
      background: ${colors.background};
    }
  }
  /*
   *  Yup schema warn
   */
  span {
    min-width: 68px;
    color: ${colors.warning1};
    text-align: justify;
    font-size: 12px;
    line-height: 14px;
    font-weight: 600;
    padding: 0 3px;
  }
`;
