import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  width: 100%;
  height: 64px;
  background: #fff;
  box-shadow: 0 0 20px rgba(125, 64, 231, 0.08);
  display: flex;
  justify-content: space-between;
  padding: 15px;

  nav {
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 130px;
      height: 22px;
    }
  }
`;

export const Menu = styled.ul`
  border-left: 1px solid ${colors.grey2};
  margin-left: 25px;
  padding-left: 25px;
  height: 100%;
  display: flex;
  align-items: center;

  li {
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: ${colors.purple};
      letter-spacing: 2px;
    }
  }

  li + li {
    margin-left: 7%;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  span {
    display: block;
    font-weight: bold;
  }

  button {
    border: none;
    background: none;
    color: ${colors.warning1};
    font-weight: bold;
    font-size: 14px;
    margin-top: 5px;
    display: flex;
    align-items: center;

    svg {
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
  }
`;
