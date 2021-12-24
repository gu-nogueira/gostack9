// Vamos utilizar o 'css' para adicionar um conjunto de css a mais em um componente baseado em alguma informação
import styled, { css } from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;

  ${(props) =>
    props.hasUnread &&
    css`
      /* & refere-se a Badge, after então é o elemento antes de Badge */
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff892e;
        /* content é obrigatório para renderizar o elemento antes de badge */
        content: '';
        border-radius: 50%;
      }
    `};
`;

export const NotificationList = styled.div`
  position: absolute;
  width: 260px;
  /* Isso faz com que a caixa de notificação sempre fique alinhada ao centro do Badge, baseado em sua largura */
  left: calc(50% - 130px);
  top: calc(100% + 30px);
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 15px 5px;
  opacity: 0;
  visibility: collapse;
  transition: all 0.2s;

  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      visibility: visible;
    `}

  /* CSS arrow */
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.4);
  }
`;

export const Scroll = styled(PerfectScrollBar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #fff;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.5;
    margin-bottom: 5px;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
  }

  ${(props) =>
    props.unread &&
    css`
      &::after {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #ff892e;
        border-radius: 50%;
        margin-left: 10px;
      }
    `}
`;
