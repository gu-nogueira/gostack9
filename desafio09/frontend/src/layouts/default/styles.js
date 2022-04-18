import styled from 'styled-components';
import colors from '../../styles/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

export const Content = styled.div`
  padding-top: 64px;

  section {
    & + section {
      margin-top: 50px;
    }
  }

  @media only screen and (max-width: 1049px) {
    section {
      & + section {
        margin-top: 30px;
      }
    }
  }

  /*
   *  Cards
   */

  .card {
    background: #fff;
    padding: 30px;
    border-radius: 5px;
    border: 1px solid ${colors.border};

    @media only screen and (max-width: 1049px) {
      padding: 15px;
    }
  }

  .sub-card {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid ${colors.border};
    overflow: hidden;

    @media only screen and (max-width: 1049px) {
      padding: 15px;
    }
  }

  /*
   *  Tags
   */

  .tag {
    display: inline;
    font-size: 14px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 5px;
  }

  .type {
    margin: 0;
    font-weight: 700;
  }

  /*
  *  Tag colors
  */

  .tag.green {
    color: ${colors.green2};
    background: ${colors.green2 + '40'};
  }

  .tag.cyan {
    color: ${colors.green3};
    background: ${colors.green3 + '40'};
  }

  .tag.orange {
    color: ${colors.orange2};
    background: ${colors.orange2 + '40'};
  }

  .tag.blue {
    color: ${colors.blue1};
    background: ${colors.blue1 + '40'};
  }

  /*
   *  Sliders
   */

  .splide__pagination__page {
    background: ${colors.background};
    opacity: 0.8;
    transition: all 0.2s;
  }

  .splide__pagination__page.is-active {
    background: ${colors.green3};
    opacity: 1;
  }

  /*
   *  Inputs
   */

  input[type='checkbox'] {
    -webkit-appearance: none;
    border: 2px solid ${colors.grey2};
    padding: 7px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
    margin-right: 5px;
    transition: all 0.1s;
  }

  input[type='checkbox']:checked {
    background: ${colors.green3};
    border: 2px solid ${colors.green3};
    color: #fff;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  input[type='checkbox']:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  input[type='checkbox']:checked:after {
    display: block;
    left: 4px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  input[type='checkbox']:disabled {
    border: 2px solid ${colors.grey2};
    background: ${colors.grey1 + '33'};
  }

  input[type='radio'] {
    -webkit-appearance: none;
    border: 2px solid ${colors.grey2};
    padding: 7px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    margin-right: 5px;
    transition: all 0.1s;
  }

  input[type='radio']:checked {
    background: ${colors.green3};
    border: 2px solid ${colors.green3};
    color: #fff;
  }

  input[type='radio']:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  input[type='radio']:checked:after {
    display: block;
    left: 3px;
    top: 3px;
    width: 2px;
    height: 2px;
    background: #fff;
    border: 3px solid #fff;
    border-radius: 50%;
  }

  input[type='radio']:disabled {
    border: 2px solid ${colors.grey2};
    background: ${colors.grey1 + '33'};
  }

  /*
   *  Buttons
   */

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 38px;
    padding: 10px 16px;
    border: none;
    border-radius: 5px;
    color: #fff;
    white-space: nowrap;
    transition: background 0.2s;

    &:disabled {
      background: ${colors.grey2} !important;
      cursor: not-allowed !important;

      &:hover {
        background: ${colors.grey1} !important;
      }
    }
  }

  .button.small {
    height: 32px;
    font-size: 14px;
  }

  .button.orange {
    background: ${colors.orange1};

    &:hover {
      background: ${colors.orange2};
    }
  }

  .button.green {
    background: ${colors.green4};

    &:hover {
      background: ${colors.green3};
    }
  }

  .button.red {
    color: ${colors.warning1};
    background: ${colors.warning1 + '33'};

    &:hover {
      color: #fff;
      background: ${colors.warning1};
    }
  }

  .button.blue {
    color: #fff;
    background: ${colors.blue1};

    &:hover {
      background: ${colors.blue2};
    }
  }

  .button.actions {
    width: 30px;
    height: 30px;
    padding: 6px;

    svg {
      width: 18px;
      height: 18px;
      min-width: 18px;
      min-height: 18px;
    }
  }

  .button.actions.view {
    background: ${colors.blue1 + '33'};
    color: ${colors.blue1};
  }

  .button.actions.view:hover {
    background: ${colors.blue1 + '66'};
  }

  .button.actions.edit {
    background: ${colors.green2 + '33'};
    color: ${colors.green2};
  }

  .button.actions.edit:hover {
    background: ${colors.green2 + '66'};
  }

  .button.actions.delete {
    background: ${colors.warning1 + '33'};
    color: ${colors.warning1};
  }

  .button.actions.delete:hover {
    background: ${colors.warning1 + '66'};
  }

  .big-button {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    padding: 10px 10px 10px 20px;
    border: none;
    border-radius: 5px;
    color: #fff;
    transition: all 0.2s ease;
    border-left: 14px solid rgba(255, 255, 255, 0.25);

    p {
      display: flex;
      align-items: center;
      font-size: 18px;
      text-align: left;
      margin-right: 10px;

      svg {
        margin-right: 10px;
        min-width: 18px;
        min-height: 18px;
        width: 18px;
        height: 18px;
        fill: #fff;
      }
    }

    @media only screen and (max-width: 1049px) {
      width: 100%;
    }
  }

  .big-button:hover {
    border-left: 20px solid rgba(255, 255, 255, 0.25);
    padding: 10px 10px 10px 20px;

    @media only screen and (max-width: 1049px) {
      width: 100%;
    }
  }

  .big-button > svg {
    margin: 0 0 auto auto;
    min-width: 16px;
    min-height: 16px;
    opacity: 0.7;
  }

  .big-button.orange {
    background: ${colors.orange1};

    &:hover {
      background: ${colors.orange2};
    }
  }

  .big-button.green {
    background: ${colors.green2};

    &:hover {
      background: ${colors.green1};
    }
  }

  .big-button.red {
    color: ${colors.warning1};
    background: ${colors.warning1 + '40'};

    &:hover {
      color: #fff;
      background: ${colors.warning1};
    }
  }

  .big-button.blue {
    color: #fff;
    background: ${colors.blue1};

    &:hover {
      background: ${colors.blue2};
    }
  }

  /*
   *  Selects
   */

  select {
    height: 38px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    border: 1px solid ${colors.grey2};
    border-radius: 5px;
  }

  /*
   *  Responsive table
   */

  table {
    border-collapse: collapse;
    border-top: 1px solid ${colors.border};
    border-bottom: 1px solid ${colors.border};
    margin: 20px 0 0 0;
    width: 100%;
    table-layout: fixed;
  }

  table tbody tr:nth-child(odd) {
    background: ${colors.grey2 + '33'};
    /* border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd; */
  }

  table tbody tr:hover {
    box-shadow: inset 0 0 0 2px ${colors.green3 + '40'};
  }

  table tr {
    border-radius: 5px;
  }

  table th,
  table td {
    padding: 10px;
    font-size: 14px;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre;

    img {
      display: block;
      margin: 0 auto;
      object-fit: cover;
      width: 70px;
      height: 40px;
      border-radius: 5px;
    }
  }

  table th {
    font-size: 0.85em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 20px 10px;
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
   *  Loaders
   */

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    svg {
      display: flex;
      align-self: center;
      width: 60px;
      fill: ${colors.green4};
      margin-bottom: 20px;
    }
  }
`;
