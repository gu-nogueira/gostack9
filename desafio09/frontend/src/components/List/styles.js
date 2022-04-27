import styled, { keyframes, css } from 'styled-components';
import colors from '../../styles/colors';

import { AiFillWarning } from 'react-icons/ai';

/*
 *  Animations
 */

const dropDownOn = keyframes`
  from {
    padding: 0;
    opacity: 0;
  }
  to {
    padding: 15px;
    opacity: 1 ;
  }
`;

export const Container = styled.div`
  /*
   *  Responsive table
   */

  table {
    border-collapse: separate;
    border-spacing: 0 21px;
    width: 100%;
  }

  table tbody tr {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(125, 64, 231, 0.05);
  }

  td:first-child,
  th:first-child {
    border-radius: 5px 0 0 5px;
  }

  td:last-child,
  th:last-child {
    border-radius: 0 5px 5px 0;
  }

  table tbody tr:hover {
    box-shadow: inset 0 0 0 2px ${colors.purple + '40'};
  }

  table th,
  table td {
    font-size: 16px;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre;

    img {
      display: block;
      margin: 0 auto;
      object-fit: cover;
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
  }

  table th:last-child,
  table td:last-child {
    text-align: right;
  }

  table th {
    padding: 0px 25px;
  }

  table td {
    padding: 0px 25px;
    height: 60px;
  }

  /*
   *  Mobile adjustment
   */

  @media screen and (max-width: 1049px) {
    table {
      border: 0;
    }

    table caption {
      font-size: 1.3em;
    }

    table thead {
      border: none;
      height: 1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    table tr {
      padding: 0 10px;
      display: block;
      margin-bottom: 0.625em;
    }

    table td {
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: 0.8em;
      text-align: right;
    }

    table td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    table td:last-child {
      border-bottom: 0;
    }
  }

  /*
   *  Button
   */

  button {
    border: none;
    background: transparent;
    transition: opacity 0.2s;

    svg {
      width: 22px;
      height: 22px;
      fill: ${colors.grey1};
    }
  }

  /*
   *  Actions box
   */
`;

export const DropBox = styled.ul`
  display: none;
  position: absolute;
  white-space: pre;
  background: #fff;
  border: 1px solid ${colors.border};
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(125, 64, 231, 0.1);
  text-align: left;
  right: 17.5%;
  ${(props) =>
    props.active &&
    css`
      animation: ${dropDownOn} 0.2s ease;
      display: block;
      margin-bottom: 6px;
      height: auto;
    `}

  li {
    svg.view {
      fill: ${colors.purpleLight};
    }

    svg.edit {
      fill: ${colors.blue1};
    }

    svg.delete {
      fill: ${colors.warning1};
    }

    button,
    a,
    a:active {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: normal;
      color: ${colors.grey1};
      padding: 0;
      transition: all 0.2s;

      svg {
        width: 16px;
      }
    }

    button:hover,
    a:hover {
      color: ${colors.purple};

      svg {
        fill: ${colors.purple};
      }
    }
    & + li {
      margin-top: 12px;
      border-top: 1px solid ${colors.grey2};
      padding-top: 12px;
    }
  }
`;

export const DeleteWarning = styled(AiFillWarning).attrs({
  size: 50,
})`
  width: 50px;
  height: 50px;
  display: flex;
  margin: 0 auto 20px auto;
  color: ${colors.warning1};
`;
