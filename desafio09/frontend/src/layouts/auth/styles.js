import styled from 'styled-components';
import colors from '../../styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  /*
   *  Mobile screen adjustment
   */

  @media only screen and (max-width: 767px) {
    align-items: flex-start;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 740px;

  form {
    max-width: 380px;
    background: #fff;
    padding: 60px 30px;
    border: 1px solid ${colors.border};
    border-radius: 5px;
    display: flex;
    flex-direction: column;

    a {
      margin: 15px 0;
    }

    /*
     *  Buttons
     */

    button[type='submit'] {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 15px 0 0;
      height: 38px;
      background: ${colors.orange1};
      color: #fff;
      border: none;
      border-radius: 5px;
      transition: background 0.2s;

      &:hover {
        background: ${colors.orange2};
      }

      svg {
        margin-right: 10px;
        width: 20px;
        fill: white;
      }
    }
  }

  /*
   *  Mobile
   */

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 15px !important;
    margin: 0;
  }
`;
