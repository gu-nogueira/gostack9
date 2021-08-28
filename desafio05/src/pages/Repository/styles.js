import styled from 'styled-components';

export const Loading = styled.div`
  color: #FFF;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a, a:link, a:visited, a:active {
    color: #00bfff;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  select {
    border: 1px solid #EEE;
    padding: 10px 5px;
    border-radius: 4px;
    font-size: 16px;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    background: #00bfff17;
    color:  #00bfff;
    border: 1px solid #00bfff;
    padding: 5px 6px;
    border-radius: 4px;
    transition: all 0.2s;
  }

  button:disabled {
    opacity: 0.5;
  }

  button:disabled:hover {
    background: #00bfff17;
    color:  #00bfff;
    cursor: not-allowed;
  }

  button:hover {
    color: white;
    background: #00bfff;
  }

  small {
    margin: 0 10px;
  }

`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;
      line-height: 1.3em;

      a {
        text-decoration: none;
        color: #333;
        transition: all 0.2s;

        &:hover {
          color: #00bfff;
        }
      }

      span {
        background: #00bfff17;
        color: #00bfff;
        border: 1px solid #00bfff;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }

    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }

  }
`;
